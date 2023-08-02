import dotenv from 'dotenv';
dotenv.config();

const {
  PORT,
  DB_URL_LOCAL,
  DB_URL_GLOBAL,
  DB_NAME,
  JWT_SECRET,
  SESSION_SECRET,
} = process.env;

export default {
  port: PORT,
  db: {
    url_local: DB_URL_LOCAL,
    url_global: DB_URL_GLOBAL,
    database: DB_NAME,
  },
  jwtSecret: JWT_SECRET,
  sessionSecret: SESSION_SECRET,
};
