import express, { Request, Response } from 'express';
import * as userController from '../controllers/user.controller';

const Router = express.Router();

Router.get('/healthcheck', (req: Request, res: Response): void => {
  res.sendStatus(200);
});

Router.post('/login', userController.loginUser);
Router.post('/register', userController.registerUser);

export default Router;
