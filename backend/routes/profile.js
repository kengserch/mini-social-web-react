import { Router } from 'express';
import { getProfile, createProfile, updateProfile } from '../controllers/profile.js';
import { validateToken } from '../middlewares/validateToken.js';

const router = Router();

router.post('/create-profile', createProfile);
router.put('/update-profile', updateProfile);
router.get('/:userId', validateToken, getProfile);

export const profileRoutes = router;
