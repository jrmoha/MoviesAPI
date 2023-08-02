import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { asyncWrapper } from '../middlewares/async.middleware.js';

export const getUserMovies = asyncWrapper(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id).populate('movies');
    res.status(200).json({ success: true, data: user?.FavoriteMovies });
  },
);

export const addMovieToUser = asyncWrapper(
  async (req: Request, res: Response) => {
    const { movieId } = req.params as unknown as {
      movieId: mongoose.Types.ObjectId;
    };
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('User not found');
    } else {
      if (!user.FavoriteMovies.includes(movieId)) {
        user.FavoriteMovies.push(movieId);
        await user.save();
      }
      res.status(200).json({ success: true, data: user?.FavoriteMovies });
    }
  },
);
