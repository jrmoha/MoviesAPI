import { Request, Response } from 'express';
import Movie from '../models/Movie.js';
import { asyncWrapper } from '../middlewares/async.middleware.js';

export const getNowPlayingMovies = asyncWrapper(
  async (_req: Request, res: Response) => {
    const data = await Movie.getNowPlayingMovies();
    res.status(200).json({ success: true, data: data });
  },
);

export const getMovieById = asyncWrapper(
  async (req: Request, res: Response) => {
    const data = await Movie.getMovieById(Number(req.params.id));
    res.status(200).json({ success: true, data: data });
  },
);
