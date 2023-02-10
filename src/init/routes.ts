import { Express } from 'express';

import { authRouter, userRouter } from '../mvc/routes';
import { Routes } from '../mvc/routes/routesStrings';

export default (app: Express) => {
  app.use('/v1', authRouter);
  app.use('/v1'+Routes.user, userRouter);
  //user
};
