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
              INSERT INTO post (user_id, category_id, title, post_url) VALUES ($1, $2, $3, $4) RETURNING *;
              `;
        const result = await db.query(query, [user_id, category_id, title, postUrl]);

        return res.status(201).json({
            message: 'Post created successfully!',
            post: result.rows[0],
        });
    }),
];