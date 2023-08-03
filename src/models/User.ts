import mongoose from 'mongoose';
import IMovie from '../@types/movie.interface.js';

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: [true, 'Username Is Required'],
    unique: true,
  },
  Password: {
    type: String,
    required: [true, 'Password Is Required'],
  },
  Age: Number,
  Email: {
    type: String,
    required: [true, 'Email Is Required'],
    unique: true,
  },
  FavoriteMovies: {
    type: [Object as any as IMovie],
    default: [],
  },
  WatchedMovies: {
    type: [Object as any as IMovie],
    default: [],
  },
  WatchLaterMovies: {
    type: [Object as any as IMovie],
    default: [],
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('User', userSchema);

export default User;
