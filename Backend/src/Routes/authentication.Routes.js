import express from 'express';
import { register, login, getOrigin, verifyRegistration } from '../Controller/authentication.Controller.js';
import { authMiddleware } from '../Middleware/Middleware.authentication.js';

const router = express.Router();

router.post('/register', register);
router.post('/register/verify-otp', verifyRegistration);
router.post('/login', login);
router.get('/me', authMiddleware, getOrigin);

export default router;
