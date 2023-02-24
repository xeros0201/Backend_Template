import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
 
function newConnection (uri:string) {

  const conn  = mongoose.createConnection(uri,{
    
  })
  conn.on("connected",function (){
    console.log(`${this.name} connected`)
  })
  conn.on("disconnected",function (){
    console.log(`${this.name} disconnected`)
  })
  conn.on("error",function (error){
    console.log(" error "+`${JSON.stringify(error)}`)
  })

  return conn
}
const connPrimary = newConnection(process.env.DATABASE_URL)
 

const connTest = newConnection(process.env.DATABASE_URL_2)

 

process.on('SIGINT',async ()=>{
  await connPrimary.close()
  await connTest.close()
  process.exit(0)
})




export  {
  connPrimary,
  connTest
}