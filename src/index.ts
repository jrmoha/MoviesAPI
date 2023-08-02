import express, { Application } from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/index.js';
import connectDatabase from './Database/index.js';
import authRouter from './routes/auth.router.js';
import movieRouter from './routes/movies.router.js';
import notFoundMiddleware from './middlewares/not-found.middleware.js';
import errorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
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
app.use('/api/movies', movieRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT: number = config.port as unknown as number;

const start = async () => {
  try {
    connectDatabase();
    app.listen(PORT, () => console.log(`Server running`));
  } catch (error) {
    console.log('Error while starting the server');
    console.log(error);
  }
};

start();
