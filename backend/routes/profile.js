import { Router } from "express";
import { getEditProfile, getProfile, updateProfile } from "../controllers/profile.js";

const router = Router();

router.post("/upload-profile", updateProfile);
router.get("/:userId", getProfile);
router.get("/edit/:userId", getEditProfile);




export const profileRoutes = router;