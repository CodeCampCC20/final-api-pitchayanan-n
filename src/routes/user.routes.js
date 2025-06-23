import express from 'express';
import { getMeUser, updateUser } from '../controllers/user.controller.js';
import { authCheckUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/me", authCheckUser, getMeUser)
router.patch("/me", authCheckUser, updateUser)

export default router;