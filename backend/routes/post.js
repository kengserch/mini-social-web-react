import { Router } from 'express';
import { createPost } from '../controllers/post.js';

const router = Router();

router.post('/', createPost);

export const postRoutes = router;
