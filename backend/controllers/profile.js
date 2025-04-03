import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { db } from '../db.js';
import asyncHandler from 'express-async-handler';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/profile';
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

export const createProfile = [
    upload.single('avatar'), // Middleware สำหรับอัปโหลดรูป
    asyncHandler(async (req, res) => {
        const { user_id, full_name, bio } = req.body;

        let avatarUrl = null;
        if (req.file) {
            avatarUrl = `${req.protocol}://${req.get('host')}/uploads/profile/${req.file.filename}`;
        }

        const query = `
              INSERT INTO profile (user_id, full_name, avatar_url, bio, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *;
              `;
        const result = await db.query(query, [user_id, full_name, avatarUrl, bio]);

        return res.status(201).json({
            message: 'Profile created successfully!',
            profile: result.rows[0],
        });
    }),
];

export const updateProfile = [
    upload.single('avatar'), // Middleware สำหรับอัปโหลดรูป
    asyncHandler(async (req, res) => {
        const { user_id, full_name, bio } = req.body;

        let avatarUrl = null;
        if (req.file) {
            avatarUrl = `${req.protocol}://${req.get('host')}/uploads/profile/${req.file.filename}`;
        }
        const query = `UPDATE profile SET 
                            full_name = $1, 
                            bio = $2, 
                            avatar_url = COALESCE($3, avatar_url), 
                            updated_at = NOW() 
                            WHERE user_id = $4 RETURNING *; `;
        const result = await db.query(query, [full_name, bio, avatarUrl, user_id]);

        return res.status(200).json({
            message: 'Profile updated successfully!',
            profile: result.rows[0],
        });
    }),
];

export const getProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await db.query(
        `SELECT profile.full_name, profile.avatar_url, profile.bio, users.username, users.email
        FROM profile
        INNER JOIN users ON profile.user_id = users.user_id
        WHERE profile.user_id = $1`,
        [userId]
    );

    if (result.rows.length === 0) {
        res.status(200).json({ message: 'Profile not found.' });
    }
    res.json({ profile: result.rows[0] });
});


