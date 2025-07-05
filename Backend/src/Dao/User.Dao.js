import User from "../Model/UserModel.js";
import UrlModel from '../Model/Model.js';

export const findUserByEmail = async (email) =>{
    console.log(email)
    return await User.findOne({email})
}

export const findUserById = async (id) =>{
    return await User.findById(id)
} 

export const createUser = async ({name, email, password})=>{
    console.log("createUser called with:", name, email, password)
    const newUser = new User ({username: name, email, password});
    await newUser.save();
    return newUser;
} 

export const getallurlbyuserDao = async (id) =>{
    return await UrlModel.find({user:id})
}