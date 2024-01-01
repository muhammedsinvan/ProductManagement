import express from 'express' 
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './Connection/database.js';

connectDB();

const app = express();

app.use(express.json({limit:'25mb'})); 
app.use(express.urlencoded({limit:'25mb',extended:true}))



app.listen(8000,()=>{
    console.log("port connected to 8000")
})