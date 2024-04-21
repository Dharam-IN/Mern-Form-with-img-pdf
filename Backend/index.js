import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DBConnect } from './DB/database.js';
import DataRouter from './Routes/DataRouter.js';
import { fileURLToPath } from 'url';
import multer from 'multer';
const upload = multer();
import path from 'path';



const app = express();

// config
dotenv.config()


// app.use(upload.none());


// check data
app.post('/data', upload.fields([{ name: 'postimage', maxCount: 1 }]), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.send('Received your data!');
});

  
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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