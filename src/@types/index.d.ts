import User from './user_type';
declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
export {};