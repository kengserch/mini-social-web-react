import { Router } from "express";
import { getEditProfile, getProfile, updateProfile, checkProfile } from "../controllers/profile.js";

const router = Router();

router.post("/upload-profile", updateProfile);
router.get("/:userId", getProfile);
router.get("/edit/:userId", getEditProfile);
router.get("/check/:userId", checkProfile);


export const profileRoutes = router;