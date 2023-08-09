import { Router } from 'express';
import {
  getMoviesController,
  getMovieById,
} from '../controllers/movies.controller.js';
import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const router = Router();

router.get('/:type', authenticationMiddleware, getMoviesController);
router.get('/movie/:id', authenticationMiddleware, getMovieById);
export default router;
