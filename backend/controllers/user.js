import { db } from "../db.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).send({ message: "All fields are required!" });
        return;
    }
    const userAvailable = await db.query('SELECT * FROM "user" WHERE username = $1 or email = $2' , [username,email])

    if (userAvailable) {
        res.status(400).send({ message: "Username or Email already registered!" });
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const result = await db.query('INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING user_id', [username, email, hash]);
    res.status(201).send({ status: 'ok' ,message: "User added successfully!", userId: result.rows[0].user_id });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await db.query('SELECT * FROM "user" WHERE email = $1', [email]);

    if (result.rows.length === 0) {
        res.status(401).send({ message: "Invalid credentials!" });
        return;
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        res.status(401).send({ message: "Invalid credentials!" });
        return;
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });


    res.status(200).json({ status: 'ok' , message: 'Login Successful' , token});
});
