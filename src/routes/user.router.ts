import { Router } from 'express';
import {
    addMovieToFavorites,
    getUserFavoritesMovies,
    removeMovieFromFavorites,
} from '../controllers/user.controller.js';
import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const router = Router();

router.get('/movies', authenticationMiddleware, getUserFavoritesMovies);
router.post('/add/:movieId', authenticationMiddleware, addMovieToFavorites);
router.delete('/delete/:movieId', authenticationMiddleware, removeMovieFromFavorites);

export default router;
