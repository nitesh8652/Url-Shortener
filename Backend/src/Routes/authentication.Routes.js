// FIXED authentication.Routes.js

import express from 'express';
import { login, register } from '../Controller/authentication.Controller.js'; 
import { authMiddleware } from '../Middleware/Middleware.authentication.js';
import { getOrigin } from '../Controller/authentication.Controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get("/origin", authMiddleware, getOrigin)

export default router;
