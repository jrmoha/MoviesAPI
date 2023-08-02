import { Router } from 'express';
import {
  getNowPlayingMovies,
  getMovieById,
} from '../controllers/movies.controller.js';
import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const router = Router();

router.get('/now-playing', authenticationMiddleware, getNowPlayingMovies);
router.get('/movie/:id', authenticationMiddleware, getMovieById);
export default router;
