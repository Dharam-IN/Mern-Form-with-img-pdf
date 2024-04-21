import express from 'express';
import { DataController } from '../Controllers/DataController.js';
const router = express.Router();

import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// Routers
router.post("/data", upload.fields([{ name: 'postimage', maxCount: 1 }]), DataController)


export default router;