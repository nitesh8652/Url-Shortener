import { registerUser, loginUser } from "../Services/authentication.Service.js";
import wrapAsync from "../Utils/TryCatch.js";
import { cookieOptions } from "../config/Cookies.js";
import { verifyOtp } from "../Services/Otp.js";
import User from "../Models/UserModel.js";
import { signToken } from "../Utils/helper.js";
import bcrypt from "bcrypt";
import { sendmail } from "../Utils/Mail.js";
import { generateOtp } from "../Services/Otp.js";

export const register = wrapAsync(async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // 1. Register user as unverified (add a 'verified' field to your user model)
        const { user } = await registerUser(name, email, password); // user.verified = false

        // 2. Generate OTP and send email
        const otpvalidate = generateOtp(email);

        

        await sendmail(
            email,
            "Url Shortener Authentication",
            `Welcome to URL Shortener ${name}! , Your Verification Code Is: ${otpvalidate}                 || gnore If You Have Not Registered`,
            
          
            
            
        );

        // 3. Respond with OTP sent
        res.status(201).json({ success: true, message: 'OTP sent to your email' });
    } catch (err) {
        console.error("Registration Error:", err.message);
        res.status(500).json({ success: false, message: "Registration failed" });
    }
});


export const login = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    

    if(!user.verified){
        return res.status(400).json({success: false, message: "Please verify your email"});
    }
import { cookieOptions } from "../config/Cookies.js";

    // Set the cookie with the correct name
    res.cookie('accessToken', token, cookieOptions);
    
    console.log('Setting cookie:', 'accessToken', token);
    
    res.status(200).json({
        success: true,
        message: "Login Successful",
        user
    });
});
export const verifyRegistration = wrapAsync(async (req, res) => {
  const { email, otp } = req.body;

export const getOrigin = wrapAsync(async (req, res) => {
    console.log('User in request:', req.user);
    res.status(200).json({
        success: true,
        message: "User Verified",
        user: req.user
  if (!verifyOtp(email, otp)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired OTP.'
    });

}); 

export const logout = (req, res) =>{
 res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None'
  }

  // Mark user verified
  const user = await User.findOneAndUpdate(
    { email },
    { $set: { verified: true } },
    { new: true }
  );

  // Sign a JWT
  const token = signToken(user._id);

  // Set the cookie
  res.cookie('accessToken', token, cookieOptions);

  // Return success + user
  res.json({
    success: true,
    message: 'Email verified!',
    user,
    token
  });
  return res.status(200).json({ message: 'Logged out successfully' });
};
});