import express from 'express';
import { loginDoctor, loginUser, registerDoctor, registerUser } from '../controllers/auth.controller.js';
import { registerSchemaDoctor, registerSchemaUser, validate } from '../validations/validator.js';

const router = express.Router();

router.post("/register/doctor",validate(registerSchemaDoctor), registerDoctor);
router.post("/register/user", validate(registerSchemaUser), registerUser);
router.post("/login/user", loginUser);
router.post("/login/doctor", loginDoctor);

export default router;