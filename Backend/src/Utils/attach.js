import { verifyToken } from "../Middleware/Middleware.authentication.js";
import { findUserById } from "../Dao/User.Dao.js";  

export const attach = async (req, res, next) => {
    const token = req.cookies.accessToken; 
    if (!token) return next();
    try {
        const decoded = verifyToken(token); 
        const user = await findUserById(decoded); 
        if (!user) return next();
        req.user = user; 
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        next(); 
    }
};
