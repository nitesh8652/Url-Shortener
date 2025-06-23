import express from 'express';
import { createShortUrl  } from '../Controller/Controller.js';

const router = express.Router();

router.post('/',createShortUrl);
 

export default router;