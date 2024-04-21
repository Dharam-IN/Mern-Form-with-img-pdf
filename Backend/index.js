import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DBConnect } from './DB/database.js';
import DataRouter from './Routes/DataRouter.js';
import multer from 'multer';
const upload = multer();



const app = express();

// config
dotenv.config()


// Middleware to parse `multipart/form-data`
app.use(upload.none());

app.post('/data', (req, res) => {
    console.log(req.body); // This will now contain the parsed form data
    res.send('Received your data!');
  });
  
// Cors
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use("/api/v1", DataRouter)

const PORT = 5000
app.listen(PORT, function(){
    console.log(`Server Running on ${PORT} Port`);
})

DBConnect()