import { nanoid } from 'nanoid'; 
import { cookieOptions } from '../config/Cookies.js';
import jsonwebtoken from 'jsonwebtoken';

export const generateNanoid = (length = 7) => {
    return nanoid(length);
}

export const signToken = (payload) => {
    return jsonwebtoken.sign({ id: payload }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export const verifyToken = (token) => {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    return decoded.id;
}