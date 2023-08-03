export default interface IMovie {
  id: string;
  title: string;
  original_title: string;
  overview: string;
  vote_average?: number;
  release_date?: string;
  poster_path: string;
  backdrop_path: string;
  genres?: string[];
  status?: string;
  runtime?: number;
  users_rating?: number;
}
