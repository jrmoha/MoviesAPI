import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/index.js';
import NotFoundError from '../errors/not-found.js';
import { asyncWrapper } from '../middlewares/async.middleware.js';
import { CustomError, UnauthenticatedError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

export const signup = asyncWrapper(async (req: Request, res: Response) => {
  const { username, password, age, email } = req.body;
  const usernameExists = await User.findOne({ Username: username });
  if (usernameExists) {
    throw new CustomError('Username already exists', StatusCodes.BAD_REQUEST);
  }
  const emailExists = await User.findOne({ Email: email });
  if (emailExists) {
    throw new CustomError('Email already exists', StatusCodes.BAD_REQUEST);
  }
  const newUser = new User({
    Username: username,
    Password: bcryptjs.hashSync(password, 10),
    Age: age,
    Email: email,
  });
  console.log(newUser);
  await newUser.save();
  const { Password, WatchLaterMovies, WatchedMovies, FavoriteMovies, ...user } =
    newUser.toObject();
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
  const User_response = await User.findOne({
    $or: [{ Username: username }, { Email: username }],
  });
  if (!User_response) {
    throw new NotFoundError('User Not Found');
  }
  const isMatch = bcryptjs.compareSync(password, User_response.Password);
  if (!isMatch) {
    throw new UnauthenticatedError('Password Incorrect');
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
