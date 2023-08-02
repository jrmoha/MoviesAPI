import express, { Request, Response, Application } from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import User from './models/User';
import connectDatabase from './Database';
import authRouter from './routes/auth.router';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors('*'));
app.use(morgan('dev'));
app.use(
  session({
    secret: config.sessionSecret!,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);

app.use('/api/auth', authRouter);

connectDatabase();

const PORT: number = config.port as unknown as number;

app.get('/', async (req: Request, res: Response) => {
  const username = req.query.username as string;
  console.log(username);
  const user = await User.findOne({ Username: username });
  if (!user) {
    return res.status(404).json({ error: 'User Not Found' });
  }
  res.status(200).json({ user: user });
});

app.listen(PORT, () => {
  console.log('The application is listening on port 3000!');
});
