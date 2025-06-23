import express from 'express';
import { getMeDoctor, updateDoctor } from '../controllers/doctor.controller.js';
import { authCheckDoctor } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/me", authCheckDoctor, getMeDoctor)
router.patch("/me", authCheckDoctor, updateDoctor)

export default router;