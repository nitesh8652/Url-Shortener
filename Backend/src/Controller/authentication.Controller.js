import { registerUser, loginUser } from "../Services/authentication.Service.js";
import wrapAsync from "../Utils/TryCatch.js";
import { cookieOptions } from "../config/Cookies.js";
import { signToken } from "../Utils/helper.js";
import bcrypt from "bcrypt";
import { sendmail } from "../Utils/Mail.js";

export const register = wrapAsync(async (req, res) => {

    try{

        const { name, email, password } = req.body;
        const { user, token } = await registerUser(name, email, password);
        req.user = user; 
        res.cookie('accessToken', token, cookieOptions)
        res.status(201).json({
            success: true,
            message: "Login Successfull",
            user, token
        });

        await sendingmail(
            email,
            "Welcome to URL Shortener",
            `Hello ${name}, Welcome to URL Shortener. Your account has been created successfully.`
        )

        
    }catch (err) {
        console.error("Registration Error:", err.message);  
    }

});


export const login = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    
    // Set the cookie with the correct name
    res.cookie('accessToken', token, cookieOptions);
    
    console.log('Setting cookie:', 'accessToken', token);
    
    res.status(200).json({
        success: true,
        message: "Login Successful",
        user
    });
});

export const getOrigin = wrapAsync(async (req, res) => {
    console.log('User in request:', req.user);
    res.status(200).json({
        success: true,
        message: "User Verified",
        user: req.user
    });

}); 

export const logout = (req, res) =>{
 res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None'
  });
  return res.status(200).json({ message: 'Logged out successfully' });
};
