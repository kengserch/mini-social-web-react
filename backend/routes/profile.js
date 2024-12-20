import { Router } from "express";
import { getEditProfile, getProfile, createProfile, updateProfile } from "../controllers/profile.js";

const router = Router();

router.post("/create-profile", createProfile);
router.put("/update-profile", updateProfile);
router.get("/:userId", getProfile);
router.get("/edit/:userId", getEditProfile);
// router.get("/check/:userId", checkProfile);


export const profileRoutes = router;