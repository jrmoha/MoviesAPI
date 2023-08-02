import {Router} from 'express';
import { getNowPlayingMovies } from "../controllers/movies.controller.js";

const router = Router();

router.get('/now-playing', getNowPlayingMovies as any);

export default router;
