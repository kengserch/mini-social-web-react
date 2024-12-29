import { db } from '../db.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are required!');
    }
    const userAvailable = await db.query('SELECT * FROM users WHERE username = $1 or email = $2', [username, email]);

    if (userAvailable.rows.length > 0) {
        res.status(400);
        throw new Error('Username or Email already registered!');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const result = await db.query(
        `INSERT INTO users (username, email, password) 
                                    VALUES ($1, $2, $3) RETURNING user_id`,
        [username, email, hash]
    );
    res.status(201).json({ status: 'ok', message: 'User added successfully!', userId: result.rows[0].user_id });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
        res.status(400);
        throw new Error('Email or Password is not valid!');
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        res.status(400);
        throw new Error('Email or Password is not valid!');
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ status: 'ok', message: 'Login Successful', token });
});
