import express from 'express' 
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { connectDB } from './Connection/database.js';
import userRouter from './Routes/cliend.js';

connectDB();

const app = express();

app.use(express.json({limit:'25mb'})); 
app.use(express.urlencoded({limit:'25mb',extended:true}));
app.use(cors());


app.use('/api/',userRouter);


app.listen(8000,()=>{
    console.log("port connected to 8000")
})