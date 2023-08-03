import { Request, Response } from 'express';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import User from '../models/User.js';
import { asyncWrapper } from '../middlewares/async.middleware.js';
import { NotFoundError } from '../errors/index.js';
import config from '../config/index.js';
import IMovie from '../@types/movie.interface.js';

export const getUserFavoritesMovies = asyncWrapper(
  async (req: Request, res: Response) => {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.status(200).json({ success: true, data: user.FavoriteMovies });
  },
);

export const addMovieToFavorites = asyncWrapper(
  async (req: Request, res: Response) => {
    const movieId: number = Number(req.params.movieId);
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('User not found');
    } else {
      const API_URL = `${config.api.url}/${movieId}?language=en-US`;
      const response = await fetch(API_URL, config.api.options);
      const data: any = await response.json();
      if (!data) {
        throw new NotFoundError('Movie not found');
      }
      const movie: IMovie = {
        id: data.id,
        title: data.title,
        original_title: data.original_title,
        overview: data.overview,
        backdrop_path: `${config.api.imageUrl}${data.backdrop_path}`,
        poster_path: `${config.api.imageUrl}${data.poster_path}`,
      };
      if (!user.FavoriteMovies.find((movie: any) => movie.id === data.id)) {
        console.log('movie not found');
        user.FavoriteMovies.push(movie);
        await user.save();
      }
      res.status(200).json({ success: true, data: user?.FavoriteMovies });
    }
  },
);
export const removeMovieFromFavorites = asyncWrapper(
  async (req: Request, res: Response) => {
    const { movieId } = req.params as unknown as {
      movieId: mongoose.Types.ObjectId;
    };
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('User not found');
    } else {
      user.FavoriteMovies.filter((movie: any) => {
        return movie.id != movieId;
      });
      await user.save();
      return res
        .status(301)
        .json({ success: true, data: user?.FavoriteMovies });
    }
  },
);

export const addMovieToWatchLater = asyncWrapper(
  async (req: Request, res: Response) => {
    const movieId: number = Number(req.params.movieId);
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('User not found');
    } else {
      const API_URL = `${config.api.url}/${movieId}?language=en-US`;
      const response = await fetch(API_URL, config.api.options);
      const data: any = await response.json();
      if (!data) {
        throw new NotFoundError('Movie not found');
      }
      const movie: IMovie = {
        id: data.id,
        title: data.title,
        original_title: data.original_title,
        overview: data.overview,
        backdrop_path: `${config.api.imageUrl}${data.backdrop_path}`,
        poster_path: `${config.api.imageUrl}${data.poster_path}`,
      };
      if (!user.WatchLaterMovies.find((movie: any) => movie.id === data.id)) {
        console.log('movie not found');
        user.WatchLaterMovies.push(movie);
        await user.save();
      }
      res.status(200).json({ success: true, data: user?.WatchLaterMovies });
    }
  },
);

export const removeMovieFromWatchLater = asyncWrapper(
  async (req: Request, res: Response) => {
    const movieId: number = Number(req.params.movieId);
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    user.WatchLaterMovies.filter((movie: any) => {
      return movie.id != movieId;
    });
    await user.save();
    return res
      .status(301)
      .json({ success: true, data: user?.WatchLaterMovies });
  },
);

export const addMovieToWatchedList = asyncWrapper(
  async (req: Request, res: Response) => {
    const movieId: number = Number(req.params.movieId);
    const rating: number = Number(req.query.rating);
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('User not found');
    } else {
      const API_URL = `${config.api.url}/${movieId}?language=en-US`;
      const response = await fetch(API_URL, config.api.options);
      const data: any = await response.json();
      if (!data) {
        throw new NotFoundError('Movie not found');
      }
      const movie: IMovie = {
        id: data.id,
        title: data.title,
        original_title: data.original_title,
        overview: data.overview,
        backdrop_path: `${config.api.imageUrl}${data.backdrop_path}`,
        poster_path: `${config.api.imageUrl}${data.poster_path}`,
        users_rating: rating,
      };
      if (!user.WatchedMovies.find((movie: any) => movie.id === data.id)) {
        console.log('movie not found');
        user.WatchedMovies.push(movie);
        await user.save();
      }
      res.status(200).json({ success: true, data: user?.WatchedMovies });
    }
  },
);

export const removeMovieFromWatchedList = asyncWrapper(
  async (req: Request, res: Response) => {
    const movieId: number = Number(req.params.movieId);
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    user.WatchedMovies.filter((movie: any) => {
      return movie.id != movieId;
    });
    await user.save();
    return res.status(301).json({ success: true, data: user?.WatchedMovies });
  },
);

export const getWatchedMovies = asyncWrapper(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return res.status(200).json({ success: true, data: user?.WatchedMovies });
  },
);

export const getWatchLaterMovies = asyncWrapper(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return res
      .status(200)
      .json({ success: true, data: user?.WatchLaterMovies });
  },
);
