import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './src/init/routes';
import localize from './src/init/localize';
import db from './src/init/db';
import theApp from './src/init/theApp';
import bodyParser from 'body-parser';
 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();
const port = process.env.PORT || 4000;
const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// const corsOptions = {
//   origin: 'http://localhost:8081',
// };

app.use(cors());
app.use(cookieParser());
 
app.use('/static', express.static(__dirname + '/uploads/avatars'));
theApp(app);
localize(app);
db(process.env.DATABASE_URL);
routes(app);

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${port}`);
});
export default app;
