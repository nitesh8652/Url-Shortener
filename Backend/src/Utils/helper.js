import { nanoid } from 'nanoid'; 
import {cookieOptions} from '../config/Cookies.js';
import jsonwebtoken from 'jsonwebtoken'; // <-- Add this line


export const generateNanoid = (length = 7)=>{

    return nanoid(length);
}

export const signToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn:'1h'});
}

// export const verifyToken = (token) => {

//     const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET, );
//     console.log(decoded.id)
//         return decoded.id
//     }






