import User from '../models/User.js';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import NotFoundError from '../errors/not-found.js';
import { asyncWrapper } from '../middlewares/async.middleware.js';

export const signup = asyncWrapper(async (req: Request, res: Response) => {
  const { username, password, age, email } = req.body;
  const userExists = await User.exists({ Username: username, Email: email });
  if (userExists) {
    return res.json({ Errors: 'User Already Exists' });
  }
  const newUser = new User({
    Username: username,
    Password: bcryptjs.hashSync(password, 10),
    Age: age,
    Email: email,
    FavoriteMovies: [],
  });
  console.log(newUser);
  await newUser.save();
  const token = jwt.sign(
    {
      id: newUser._id,
      username: newUser.Username,
      email: newUser.Email,
      age: newUser.Age,
      favoriteMovies: newUser.FavoriteMovies,
    },
    config.jwtSecret as string,
  );
  res.status(201).json({ success: true, user: newUser, token: token });
});

export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ Username: username });
  if (!user) {
    throw new NotFoundError('User Not Found');
  }
  const isMatch = bcryptjs.compareSync(password, user.Password);
  if (!isMatch) {
    throw new Error('Invalid Password');
  }
  const token = jwt.sign(
    {
      id: user._id,
      username: user.Username,
      email: user.Email,
      age: user.Age,
      favoriteMovies: user.FavoriteMovies,
    },
    config.jwtSecret as string,
  );
  res.status(200).json({ success: true, user: user, token: token });
});
