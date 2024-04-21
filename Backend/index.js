import express from 'express';
import dotenv from 'dotenv';
import { DBConnect } from './DB/database.js';

const app = express();

// config
dotenv.config()


const PORT = 5000
app.listen(PORT, function(){
    console.log(`Server Running on ${PORT} Port`);
})

DBConnect()