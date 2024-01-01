import express from 'express';
import cors from 'cors';

const app = express();


app.use(express.json({limit:'25mb'})); 
app.use(express.urlencoded({limit:'25mb',extended:true}))
app.use(cors())


app.listen(8000, ()=>{
    console.log(`server started at 8000`) 
}) 