import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';

export const SECRET_KEY: Secret = 'newtokennewtoken';
export interface CustomRequest extends Request {
  token: any;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
};
