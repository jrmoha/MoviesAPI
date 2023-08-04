import express, { Application } from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/index.js';
import connectDatabase from './Database/index.js';
import authRouter from './routes/auth.router.js';
import movieRouter from './routes/movies.router.js';
import userRouter from './routes/user.router.js';
import notFoundMiddleware from './middlewares/not-found.middleware.js';
import errorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.use(morgan('tiny'));
app.use(
  session({
    secret: config.sessionSecret!,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60 * 1000 * 60 * 24 },
  }),
);
app.get('/', (req, res) => {
  //know which browser is making the request
  console.log(req.headers['user-agent']);
  res.send('Hello World');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/users', userRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT: number = config.port as unknown as number;



const start = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => console.log(`Server running`));
  } catch (error) {
    console.log('Error while starting the server');
    console.log(error);
  }
};

start();
