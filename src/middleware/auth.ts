import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';

export const SECRET_KEY: Secret = 'newtokennewtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return null;

    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('token decoded middleware', decoded);

    if (typeof decoded === 'object') {
      const user = await UserModel.findOne({ _id: decoded._id, 'tokens.token': token });

      if (!user) {
        throw new Error();
      }
    }

    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
};
