import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { db } from '../db.js';
import asyncHandler from 'express-async-handler';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/post';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // จำกัดขนาดไฟล์ไม่เกิน 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/; // ประเภทไฟล์ที่อนุญาต
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Only .jpeg, .jpg, .png files are allowed!'));
        }
    },
});

export const createPost = [
    upload.single('post_image'), // Middleware สำหรับอัปโหลดรูป
    asyncHandler(async (req, res) => {
        const { user_id, title, category_id } = req.body;

        let postUrl = null;
        if (req.file) {
            postUrl = `${req.protocol}://${req.get('host')}/uploads/post/${req.file.filename}`;
        }

        const query = `
              INSERT INTO post (user_id, category_id, title, post_url) VALUES ($1, $2, $3, $4) RETURNING *;`;
        const result = await db.query(query, [user_id, category_id, title, postUrl]);

        return res.status(201).json({
            message: 'Post created successfully!',
            post: result.rows[0],
        });
    }),
];

export const getPost = asyncHandler(async (req, res) => {
    const user_id = req.query.user_id || null;
    const result = await db.query(
        `SELECT post.post_id, 
                post.title, 
                post.post_url, 
                post.created_at, 
                profile.full_name, 
                profile.avatar_url, 
                post_category.category_name,
                COUNT(DISTINCT likes.like_id) AS like_count,
                COUNT(DISTINCT comment.comment_id) AS comment_count,
                COUNT(DISTINCT post.category_id)  AS category_count,
                CASE 
                    WHEN EXISTS (
                        SELECT 1 FROM likes 
                        WHERE likes.post_id = post.post_id 
                        AND likes.user_id = $1
                    ) THEN true
                    ELSE false
                END AS is_liked
                FROM post
                INNER JOIN profile ON post.user_id = profile.user_id
                INNER JOIN post_category ON post.category_id = post_category.category_id
                LEFT JOIN likes ON post.post_id = likes.post_id
                LEFT JOIN comment ON post.post_id = comment.post_id
                GROUP BY post.post_id, post.title, post.post_url, post.created_at, 
                profile.full_name, profile.avatar_url, post_category.category_name
                ORDER BY post.created_at DESC`,
        [user_id]
    );

    const category_count = await db.query(`
        SELECT 
        post_category.category_name,
        COUNT(post.post_id) AS post_count
        FROM post_category
        LEFT JOIN post ON post.category_id = post_category.category_id
        GROUP BY post_category.category_name
        ORDER BY post_count DESC;
    `);
    res.status(200).json({
        posts: result.rows,
        posts_count: category_count.rows,
    });
});

export const likePost = asyncHandler(async (req, res) => {
    const { post_id, user_id } = req.body;

    if (!post_id || !user_id) {
        res.status(400).json({ message: 'Post ID and User ID are required' });
        return;
    }

    try {
        const existingLike = await db.query(`SELECT * FROM likes WHERE post_id = $1 AND user_id = $2`, [
            post_id,
            user_id,
        ]);

        if (existingLike.rowCount > 0) {
            // ถ้ามีไลค์อยู่แล้ว -> ลบออกเพื่อยกเลิกไลค์
            await db.query('DELETE FROM likes WHERE post_id = $1 AND user_id = $2', [post_id, user_id]);
        } else {
            // ถ้ายังไม่มีไลค์ -> เพิ่มไลค์ใหม่
            await db.query('INSERT INTO likes (post_id, user_id, created_at) VALUES ($1, $2, NOW())', [
                post_id,
                user_id,
            ]);
        }

        // นับจำนวนไลค์ทั้งหมดของโพสต์
        const likeCountResult = await db.query('SELECT COUNT(*) AS like_count FROM likes WHERE post_id = $1', [
            post_id,
        ]);
        res.status(200).json({ like_count: parseInt(likeCountResult.rows[0].like_count, 10) });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'An error occurred while liking the post' });
    }
});

export const addComment = asyncHandler(async (req, res) => {
    const { post_id, user_id, comment } = req.body;

    if (!post_id || !user_id || !comment.trim()) {
        return res.status(400).json({ message: 'Post ID, User ID, and comment are required' });
    }

    const query = `
        INSERT INTO comment (post_id, user_id, comment, created_at)
        VALUES ($1, $2, $3, NOW()) RETURNING *;
    `;
    const result = await db.query(query, [post_id, user_id, comment]);

    res.status(201).json({
        message: 'Comment added successfully!',
        comment: result.rows[0],
    });
});

export const getComments = asyncHandler(async (req, res) => {
    const { post_id } = req.params;

    if (!post_id) {
        return res.status(400).json({ message: 'Post ID is required' });
    }

    const query = `
        SELECT comment.comment_id, comment.comment, comment.created_at,
        profile.full_name, profile.avatar_url
        FROM comment
        INNER JOIN profile ON comment.user_id = profile.user_id
        WHERE comment.post_id = $1
        ORDER BY comment.created_at ASC;
    `;
    const result = await db.query(query, [post_id]);

    res.status(200).json({ comments: result.rows });
});
