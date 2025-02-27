const express= require('express');
const connectdb = require('./config/db');
const userRouter = require('./routes/user.routes');
require('dotenv').config();


let PORT=process.env.SERVER_PORT;
const app=express();

//middleware
app.use(express.json());


//routes
app.use('/user',userRouter)

app.get('/',(req,res)=>{
    res.send("this is test route");
})

app.listen(PORT,async()=>{
    await connectdb();
    console.log("server Started");
})

