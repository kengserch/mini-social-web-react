import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error('Invalid or expired token.');
            }

            req.userId = decoded.userId;
            next();
        });
    } else {
        res.status(401);
        throw new Error('Token is Missing or invalid authorization header.');
    }
});
