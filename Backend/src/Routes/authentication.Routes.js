import express from 'express';
import { login, logout, register, getOrigin, verifyRegistration,  } from '../Controller/authentication.Controller.js'; 
import { authMiddleware } from '../Middleware/Middleware.authentication.js';


const router = express.Router();

router.post('/register', register);
router.post('/register/verify-otp', verifyRegistration)

router.post('/login', login);

router.get("/origin", authMiddleware, getOrigin)
router.post('/logout', logout);

export default router;
