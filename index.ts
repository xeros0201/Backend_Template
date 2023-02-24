import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './src/mvc/routes/routes';
import localize from './src/init/localize';
 
import theApp from './src/init/theApp';
import bodyParser from 'body-parser';
 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import  fs from 'fs'
import path, { resolve } from 'path';
import helmet from 'helmet';
import { Request, Response } from 'express-serve-static-core';
import { checkDepartmentMediaAndFiles } from './src/mvc/middlewares/auth/checkDepartment';
import { checkJwt, checkJwtMedia } from './src/mvc/middlewares/auth/checkJwt';
import createHttpError from 'http-errors';

import './src/helpers/createRedisConn'
dotenv.config();
const port = process.env.PORT || 4000;
const app: Express = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
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
 
app.use('/static', express.static(__dirname + '/uploads/avatar'));

app.use('/private',[function (req:Request, res:Response, next){
 
  if(!req.query.token){
    return res.status(500).json({message:"damnnn"})
  }
 
  next()
} , express.static(__dirname + '/uploads/sing')]);
app.use('/private',[function (req:Request, res:Response, next){
 
  if(!req.query.token){
    return res.status(500).json({message:"damnnn"})
  }
 
  next()
} , express.static(__dirname + '/uploads/seal')]);

app.use('/private_files/:department/:filename',[ 
  // checkJwtMedia("token") ,
  // checkDepartmentMediaAndFiles() , 
 
  ], function (req,res){
      return res.sendFile( path.join(__dirname,`/files/${req.params.department}/${req.params.filename}`))
  });

  app.use('/private_media/:department/:filename',[ 
    // checkJwtMedia("token") ,
    // checkDepartmentMediaAndFiles() , 
   
    ], function (req,res){
        return res.sendFile( path.join(__dirname,`/media/${req.params.department}/${req.params.filename}`))
    });  

app.get('/files', [checkJwt("token")]  ,(req, res) => {
    try {
            const { } = req.query
        const basePath = path.join(__dirname, 'uploads');
      const files =   fs.readdirSync(basePath, 
          { withFileTypes: true })
         
        res.send(files);
    } catch(e) {
 
        console.log(e);
        res.sendStatus(500);
    }
});


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
 
routes(app);

 

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${port}`);
});


app.use((req,res,next)=>{


  next(createHttpError.NotFound("Not found"))
})

app.use((err,req,res,next)=>{
  res.json({
    status: err.status || 500,
    message: err.message,
    err
  })
})
export default app;
