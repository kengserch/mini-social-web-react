import { Router } from 'express';
import { createPost, getPost } from '../controllers/post.js';

const router = Router();

router.post('/', createPost);
router.get('/', getPost);

export const postRoutes = router;
