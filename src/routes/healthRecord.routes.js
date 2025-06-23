import express from 'express';
import { addHealthRecord } from '../controllers/healthRecord.controller.js';

const router = express.Router();

router.post('/health-records', addHealthRecord);

export default router;
