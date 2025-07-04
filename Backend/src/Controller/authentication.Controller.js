import { registerUser, loginUser } from "../Services/authentication.Service.js";
import wrapAsync from "../Utils/TryCatch.js";
import { cookieOptions } from "../config/Cookies.js";
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

        const otpMessage = 
  `Welcome to URL Shortener ${name}!\n` +
  `Your Verification Code Is: ${otpvalidate}\n` +
  "Ignore If You Have Not Registered\n" +
  "Thank you,\nThe URL Shortener Team";

        await sendmail(
            email,
            "Url Shortener Authentication",
         otpMessage
            
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
