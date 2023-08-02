import { Router } from 'express';
import {
    addMovieToUser,
    getUserMovies,
    removeMovie,
} from '../controllers/user.controller.js';
import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const router = Router();

router.get('/movies', authenticationMiddleware, getUserMovies);
router.post('/add/:movieId', authenticationMiddleware, addMovieToUser);
router.delete('/delete/:movieId', authenticationMiddleware, removeMovie);

export default router;
