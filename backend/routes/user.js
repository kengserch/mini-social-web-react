import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export const userRoutes = router;