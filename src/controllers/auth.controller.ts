import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/index.js';
import NotFoundError from '../errors/not-found.js';
import { asyncWrapper } from '../middlewares/async.middleware.js';

export const signup = asyncWrapper(async (req: Request, res: Response) => {
  const { username, password, age, email } = req.body;
  const userExists = await User.find({
    $or: [{ Username: username }, { Email: email }],
  });
  console.log(userExists);

  if (userExists.length > 0) {
    return res.json({ Errors: 'User Already Exists' });
  }
  const newUser = new User({
    Username: username,
    Password: bcryptjs.hashSync(password, 10),
    Age: age,
    Email: email,
  });
  console.log(newUser);
  await newUser.save();
  const { Password, ...user } = newUser.toObject();
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.Username,
      email: user.Email,
      age: user.Age,
    },
    config.jwtSecret as string,
  );
  res.status(201).json({ success: true, user: user, token: token });
});

export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const User_response = await User.findOne({ Username: username });
  if (!User_response) {
    throw new NotFoundError('User Not Found');
  }
  const isMatch = bcryptjs.compareSync(password, User_response.Password);
  if (!isMatch) {
    throw new Error('Invalid Password');
  }
  const { Password, WatchedMovies, FavoriteMovies, WatchLaterMovies, ...user } =
    User_response.toObject();
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.Username,
      email: user.Email,
      age: user.Age,
    },
    config.jwtSecret as string,
  );
  res.status(200).json({ success: true, user: user, token: token });
});
