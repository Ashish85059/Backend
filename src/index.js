import dotenv from "dotenv"
import connectDb from "./db/index.js"

dotenv.config({
    path:"./env"
})







connectDb()









/*
import express from express;
const app=express()
// this is a iffy that is executed immideately when you run file
;(async ()=>{
    try{
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
            console.log("error"+error);
            throw error;
       })
       app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`)
       })
    }
    catch(err){
        console.log("Error-> "+err);
        throw err
    }
})()

*/