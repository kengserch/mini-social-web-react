import express from 'express';
import cors from 'cors';
import { config } from "./config.js";
import { userRoutes } from './routes/user.js';
import { profileRoutes } from './routes/profile.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { postRoutes } from './routes/post.js';

const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/posts', postRoutes);
app.use('/uploads', express.static('uploads'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on ports ${port}`);
});
