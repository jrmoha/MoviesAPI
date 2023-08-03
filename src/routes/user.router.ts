import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const router = Router();
router
  .get(
    '/favorites',
    authenticationMiddleware,
    userController.getUserFavoritesMovies,
  )
  .post(
    '/favorites/add/:movieId',
    authenticationMiddleware,
    userController.addMovieToFavorites,
  )
  .delete(
    '/favorites/delete/:movieId',
    authenticationMiddleware,
    userController.removeMovieFromFavorites,
  );

router
  .get('/watched', authenticationMiddleware, userController.getWatchedMovies)
  .post(
    '/watched/add/:movieId',
    authenticationMiddleware,
    userController.addMovieToWatchedList,
  )
  .delete(
    '/watched/delete/:movieId',
    authenticationMiddleware,
    userController.removeMovieFromWatchedList,
  );

router
  .get(
    '/watchlater',
    authenticationMiddleware,
    userController.getWatchLaterMovies,
  )
  .post(
    '/watchLater/add/:movieId',
    authenticationMiddleware,
    userController.addMovieToWatchLater,
  )
  .delete(
    '/watchLater/delete/:movieId',
    authenticationMiddleware,
    userController.removeMovieFromWatchLater,
  );

export default router;
