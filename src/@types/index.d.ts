import User from './user_type.js';
declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
export {};
