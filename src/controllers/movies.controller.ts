import { Request, Response } from 'express';
import Movie from '../models/Movie.js';
import { asyncWrapper } from '../middlewares/async.middleware.js';

export const getMoviesController = asyncWrapper(
  async (req: Request, res: Response) => {
    const type = req.params.type as string;
    const data = await Movie.getMovies(type);
    res.status(200).json({ success: true, data: data });
  },
);

export const getMovieById = asyncWrapper(
  async (req: Request, res: Response) => {
    const data = await Movie.getMovieById(Number(req.params.id));
    res.status(200).json({ success: true, data: data });
  },
);
