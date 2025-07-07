import express from 'express';
import { register, login, getOrigin, verifyRegistration, logout, resendOtp } from '../Controller/authentication.Controller.js';
import { authMiddleware } from '../Middleware/Middleware.authentication.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/register/verify-otp', verifyRegistration);
router.post('/resend-otp', resendOtp);
router.get('/me', authMiddleware, getOrigin);
router.get('/logout', logout);

export default router;
