import { verifyToken } from "../Utils/helper.js";
import { findUserById } from "../Dao/User.Dao.js";
import jsonwebtoken from 'jsonwebtoken';


export const authMiddleware = async (req, res, next) => {
    // Check for token in cookies or Authorization header
    const token = req.cookies.accessToken || 
                 (req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
                  ? req.headers.authorization.split(' ')[1] : null);
    
    console.log('Cookies received:', req.cookies);
    console.log('Token found:', token);
    console.log("Headers:", req.headers);
console.log("Cookies:", req.cookies);
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access, please login first" });
    }
    
    try {
        const decoded = verifyToken(token);
        console.log('Token decoded:', decoded);
        
        const user = await findUserById(decoded);

        
        
        if (!user) {
            return res.status(401).json({ message: "User not found, please login again" });
        }
        
        req.user = user;
        console.log('User attached to request:', req.user);
        
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: "Invalid token, please login again" });
    }
};

