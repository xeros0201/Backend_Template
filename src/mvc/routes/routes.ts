import { Express } from 'express';
 
import { Routes } from './routesStrings';
import { authRouter, userRouter } from './v1';

export default (app: Express) => {
  app.use('/v1', authRouter );
  app.use('/v1'+Routes.user, userRouter);
  //user
};
