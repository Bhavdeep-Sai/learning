require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');



mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("MongoDB connected")})
.catch((err)=>{console.log("MongoDB connection Failed", err)})

const cors = require('cors');
app.use(cors());


const userRouter = require('./routes/userRouter');
app.use(express.json());
app.use('/user', userRouter);


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})