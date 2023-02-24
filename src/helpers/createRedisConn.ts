import * as redis from 'redis';



export const client  = redis.createClient({
   url:'redis://localhost:6379',
  
  
})
  client.connect().then(( )=>{
  
  })
 
  client.on("connect",function(){
    console.log("connected")
  })

  client.on("ready",function(){
    console.log(" Redis ready!!")
  })