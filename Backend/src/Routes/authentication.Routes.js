// FIXED authentication.Routes.js

import express from 'express';
import { login, logout, register } from '../Controller/Controller.js'; 
import { authMiddleware } from '../Middleware/Middleware.authentication.js';
import { getOrigin } from '../Controller/authentication.Controller.js';
import { verifyRegistration } from '../Dao/Verifyotp.js';

const router = express.Router();

router.post('/register', register);
router.post('/register/verification', verifyRegistration)

router.post('/login', login);

router.post('/logout', logout);
router.get("/origin", authMiddleware, getOrigin)

export default router;
