import express from 'express';
import { DataController } from '../Controllers/DataController.js';
const router = express.Router();


// Routers
router.post("/data", DataController)

export default router;