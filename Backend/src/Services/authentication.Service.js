import dotenv from 'dotenv';
dotenv.config();
import User from '../Model/UserModel.js';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../Dao/User.Dao.js';
import { ConflictError } from '../Utils/ErrorHandling.js'; 
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET; 

const signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const registerUser = async (name, email, password) => {
    // Check if user already exists
    const user = await findUserByEmail(email);
    
    // If user exists, just return the user (don't throw an error)
    if (user) {
        const userObj = user.toObject();
        delete userObj.password;
        return { user: userObj };
    }
    
    // Otherwise create a new user
    const newUser = await createUser({ name, email, password });
    const token = signToken({ id: newUser._id });
    
    const userObj = newUser.toObject();
    delete userObj.password;
    return { user: userObj, token };
};

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
   
    // if (!user || user.password !==password)throw new Error("Invalid email or password");
    // const token = signToken({ id: user._id });
   

    if (!user) throw new Error ("Invalid email or password");

    const ispasswordValid = await bcrypt.compare(password, user.password);

    const token = signToken({ id: user._id });
    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
    return { user, token };
};
