import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './src/mvc/routes/routes';
import localize from './src/init/localize';
import db from './src/init/db';
import theApp from './src/init/theApp';
import bodyParser from 'body-parser';
 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import helmet from 'helmet';
dotenv.config();
const port = process.env.PORT || 4000;
const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// const corsOptions = {
//   
// };

// app.use(helmet({
//   crossOriginResourcePolicy: false,
//   crossOriginOpenerPolicy:false,
//   contentSecurityPolicy:false
// }))
app.use(cors({
  credentials:true,
  origin: ['https://185-internal.vercel.app',"http://localhost:3000","http://localhost:5173","*"],
  methods: 'GET,PUT,POST,OPTIONS', 
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(cookieParser());
 
app.use('/static', express.static(__dirname + '/uploads/avatars'));
app.use('/gz', express.static(__dirname + '/uploads/unity/',{
  setHeaders: function (res){
    res.set("Content-Encoding", "gzip");
    res.type("application/javascript");
    res.set('Accept-Encoding', 'gzip');
  }
}));
app.use('/gz_js', express.static(__dirname + '/uploads/unity/',{
  setHeaders: function (res){
    res.set("Content-Encoding", "gzip");
    res.type("application/javascript");
    res.set('Accept-Encoding', 'gzip');
  }
}));
app.use('/gz_wasm', express.static(__dirname + '/uploads/unity/',{
  setHeaders: function (res){
    res.set("Content-Encoding", "gzip");
    res.set('Accept-Encoding', 'gzip');
    res.type("application/wasm");
   
  }
}));
app.use('/js', express.static(__dirname + '/uploads/unity/',{
  setHeaders: function (res){
    
    res.type("application/javascript");
 
  }
}));
theApp(app);
localize(app);
db(process.env.DATABASE_URL);
routes(app);

app.use('/sendFile', async (req,res) =>{

  return res.status(200).sendFile(__dirname + './filetest.docx')
})

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${port}`);
});
export default app;
