import fetch from 'node-fetch';
import config from '../config/index.js';
import IMovie from '../@types/movie.interface.js';
class Movie {
  async getNowPlayingMovies(page = 1): Promise<IMovie[]> {
    const API_URL = `${config.api.url}/now_playing?&language=en-US&page=${page}`;
    const response = await fetch(API_URL, config.api.options);
    const data: any = await response.json();
    data.results = data.results.map((movie: any) => {
      return {
        id: movie.id,
        title: movie.title,
        original_title: movie.original_title,
        overview: movie.overview,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        poster_path: `${config.api.imageUrl}${movie.poster_path}`,
        backdrop_path: `${config.api.imageUrl}${movie.backdrop_path}`,
        status: movie.status,
        runtime: movie.runtime,
      } as IMovie;
    });
    return data.results as IMovie[];
  }

  async getMovieById(id: number): Promise<IMovie> {
    const API_URL = `${config.api.url}/${id}?language=en-US`;
    const response = await fetch(API_URL, config.api.options);
    const data: any = await response.json();
    const movie: IMovie = {
      id: data.id,
      title: data.title,
      original_title: data.original_title,
      overview: data.overview,
      vote_average: data.vote_average,
      release_date: data.release_date,
      poster_path: `${config.api.imageUrl}${data.poster_path}`,
      backdrop_path: `${config.api.imageUrl}${data.backdrop_path}`,
      genres: data.genres.map((genre: any) => genre.name),
      status: data.status,
      runtime: data.runtime,
    };
    return movie;
  }
}

export default new Movie();
