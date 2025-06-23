 import express from 'express';
import {getallurl } from '../Controller/User.Controller.js'; 
import { authMiddleware } from '../Middleware/Middleware.authentication.js';
import { getOrigin } from '../Controller/authentication.Controller.js';

const router = express.Router();

router.get('/history',authMiddleware, getallurl);


export default router;
