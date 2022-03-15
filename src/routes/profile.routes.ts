import express, { Request, Response } from 'express';
import * as profileControllers from '../controllers/profile.controller';


// TODO: Create content and security validation middlewere for all input

const Router = express.Router();

Router.get('/healthcheck', (req: Request, res: Response): void => {
  res.sendStatus(200);
});

Router.post('/profiles', profileControllers.addProfile);

Router.get('/profiles', profileControllers.getAllProfiles);

Router.put('/profile', profileControllers.updateProfile);

Router.delete('/profile', profileControllers.deleteProfile);

export default Router;
