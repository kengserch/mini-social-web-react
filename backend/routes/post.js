import { Router } from 'express';
import { createPost, getPost, likePost } from '../controllers/post.js';

const router = Router();

router.post('/', createPost);
router.get('/', getPost);

router.post('/like', likePost);


export const postRoutes = router;
