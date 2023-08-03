import IMovie from './movie.interface.js';

type User = {
  _id?: string;
  Username: string;
  Password?: string;
  Age: number;
  Email: string;
  FavoriteMovies: IMovie[];
};

export default User;
