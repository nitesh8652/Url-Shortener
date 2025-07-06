import dotenv from 'dotenv';
dotenv.config();
import User from '../Model/UserModel.js';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../Dao/User.Dao.js';
import { ConflictError } from '../Utils/ErrorHandling.js';
import bcrypt from 'bcrypt';
import { signToken } from '../Utils/helper.js';

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email);
    if (user) throw new ConflictError("Account already exists with this email!");
    
    const newUser = await createUser({ name, email, password });
    const token = signToken(newUser._id); // Use helper function
    
    const userObj = newUser.toObject();
    delete userObj.password;
    
    console.log("User registered successfully:", newUser);
    return { user: userObj, token };
};

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
   
    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const token = signToken(user._id); // Use helper function
    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
};