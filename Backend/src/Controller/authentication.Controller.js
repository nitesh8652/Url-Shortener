import { registerUser, loginUser } from "../Services/authentication.Service.js";
import wrapAsync from "../Utils/TryCatch.js";
import { cookieOptions } from "../config/Cookies.js";
import { signToken } from "../Utils/helper.js";
import bcrypt from "bcrypt";
import { sendmail } from "../Utils/Mail.js";
import { generateOtp, verifyOtp } from "../Services/Otp.js";
import User from "../Model/UserModel.js";

export const verifyRegistration = wrapAsync(async (req, res) => {
  const { email, otp } = req.body;

  // 1) Validate OTP
  if (!verifyOtp(email, otp)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired OTP." });
  }

  // 2) Mark user as verified
  await User.updateOne({ email }, { $set: { verified: true } });

  // 3) Fetch the newly verified user
  const user = await User.findOne({ email });

  // 4) Issue JWT + set cookie with consistent options
  const token = signToken(user._id); // Use same payload structure as login
  
  // Use the same cookie options as other functions
  res.cookie("accessToken", token, cookieOptions);

  console.log('Setting cookie in verifyRegistration:', 'accessToken', token);
  console.log('Cookie options used:', cookieOptions);

  // 5) Return success + user (without password)
  const userObj = user.toObject();
  delete userObj.password;
  
  return res.json({
    success: true,
    message: "Email verified! You are now logged in.",
    user: userObj
  });
});

export const register = wrapAsync(async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { user } = await registerUser(name, email, password); // user.verified = false
        const otpvalidate = generateOtp(email);

        await sendmail(
            email,
            "Url Shortener Authentication",
            `Welcome to URL Shortener ${name}! , Your Verification Code Is: ${otpvalidate}                 || Ignore If You Have Not Registered`,
        );

        // 3. Respond with OTP sent
        res.status(201).json({ success: true, message: 'OTP sent to your email' });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ success: false, message: "Registration failed" });
    }
});

export const login = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    
    if(!user.verified){
        return res.status(400).json({success: false, message: "Please verify your email"});
    }
    
    // Set the cookie with consistent options
    res.cookie('accessToken', token, cookieOptions);    
    console.log('Setting cookie in login:', 'accessToken', token);
    console.log('Cookie options used:', cookieOptions);
    
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

export const logout = (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        path: '/' // Add path to ensure proper clearing
    });
    return res.status(200).json({ message: 'Logged out successfully' });
};