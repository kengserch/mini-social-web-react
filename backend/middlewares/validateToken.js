import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;

    // ตรวจสอบว่ามี Authorization Header และเริ่มต้นด้วย "Bearer"
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1]; // แยกเอา token ออกจาก header

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }

        // ตรวจสอบ token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                //console.error("JWT Verification Error:", err);
                return res.status(403).json({ message: "Forbidden: Invalid or expired token." });
            }

            // ถอดรหัส token และบันทึก userId ลงใน req
            req.userId = decoded.userId;
            next(); // ดำเนินการ middleware ถัดไป
        });
    } else {
        // กรณีไม่มี Authorization Header
        return res.status(401).json({ message: "Unauthorized: Missing or invalid authorization header." });
    }
});
