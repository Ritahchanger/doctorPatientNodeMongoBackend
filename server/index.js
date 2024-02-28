const express =  require("express");
const app = express();

const PORT = process.env.PORT || 5000;

const connectDb = require("../database/database");


const connectSERVER=async () =>{
    try{
        await connectDb();
        app.listen(3000,()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    }catch(error){
        console.error(`Failed to connect the server: ${error}`);
    }
}
connectSERVER();