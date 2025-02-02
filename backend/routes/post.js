import { Router } from 'express';
import { createPost, getPost, likePost, addComment, getComments } from '../controllers/post.js';

const router = Router();

router.post('/', createPost);
router.get('/', getPost);

router.post('/like', likePost);

router.post('/comment', addComment);
router.get('/:post_id/comments', getComments);


export const postRoutes = router;
