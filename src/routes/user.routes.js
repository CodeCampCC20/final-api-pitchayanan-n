import express from 'express';
import { getMeUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/me", getMeUser)

export default router;