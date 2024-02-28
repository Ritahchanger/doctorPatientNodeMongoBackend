const express =  require("express");
const app = express();

const UserRoutes = require("../routes/UserRoutes");

const PORT = process.env.PORT || 3000;

const connectDb = require("../database/database");


app.use(express.json());

app.use('/api/users',UserRoutes);


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