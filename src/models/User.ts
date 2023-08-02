import mongoose from 'mongoose';
import IMovie from './Movie.js';

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
  FavoriteMovies: [IMovie],
});

const User = mongoose.model('User', userSchema);

export default User;
