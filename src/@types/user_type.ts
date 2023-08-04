import IMovie from './movie.interface.js';

type User = {
  _id?: string;
  Username: string;
  Password?: string;
  Age: number;
  Email: string;
  FavoriteMovies?: IMovie[];
  WatchedMovies?: IMovie[];
  WatchLaterMovies?: IMovie[];
};

export default User;
