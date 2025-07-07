import { registerUser, loginUser } from "../Services/authentication.Service.js";
import wrapAsync from "../Utils/TryCatch.js";
import { cookieOptions } from "../config/Cookies.js";
import { signToken } from "../Utils/helper.js";
import bcrypt from "bcrypt";
import { sendmail } from "../Utils/Mail.js";
import { generateOtp, verifyOtp } from "../Services/Otp.js";
import User from "../Model/UserModel.js";

export const register = wrapAsync(async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        
        // If user exists, treat this as a resend OTP request
        if (existingUser) {
            const otpCode = generateOtp(email);
            
            await sendmail(
                email,
                "Url Shortener Authentication",
                `Welcome back to URL Shortener! Your new verification code is: ${otpCode}. This code will expire in 5 minutes.`,
                otpCode
            );
            
            return res.status(200).json({ 
                success: true, 
                message: 'New OTP sent to your email' 
            });
        }
        
        // Otherwise, register new user
        const { user } = await registerUser(name, email, password); // user.verified = false
        const otpCode = generateOtp(email);

        await sendmail(
            email,
            "Url Shortener Authentication",
            `Welcome to URL Shortener ${name}! Your Verification Code Is: ${otpCode} || Ignore If You Have Not Registered`,
            otpCode
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

export const verifyRegistration = wrapAsync(async (req, res) => {
  const { email, otp } = req.body;
  
  console.log("Verifying OTP request received:", { email, otp });

  if (!email || !otp) {
    console.log("Missing email or OTP in request");
    return res.status(400).json({ 
      success: false, 
      message: "Email and OTP are required." 
    });
  }

  // 1) Validate OTP
  const isValid = verifyOtp(email, otp);
  console.log("OTP validation result:", isValid);
  
  if (!isValid) {
    console.log("Invalid or expired OTP");
    return res.status(400).json({ 
      success: false, 
      message: "Invalid or expired OTP." 
    });
  }

  try {
    // 2) Mark user as verified
    const updateResult = await User.updateOne({ email }, { $set: { verified: true } });
    console.log("User update result:", updateResult);

    // 3) Fetch the newly verified user
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("User not found after verification");
      return res.status(404).json({ 
        success: false, 
        message: "User not found." 
      });
    }

    // 4) Issue JWT + set cookie
    const token = signToken({ id: user._id });
    res.cookie("accessToken", token, cookieOptions);
    console.log('Setting cookie:', token);

    // 5) Return success + user (without password)
    const userObj = user.toObject();
    delete userObj.password;
    
    console.log("Sending successful verification response");
    return res.status(200).json({
      success: true,
      message: "Email verified! You are now logged in.",
      user: userObj
    });
  } catch (error) {
    console.error("Error during verification process:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during verification process."
    });
  }
});

export const resendOtp = wrapAsync(async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required." 
      });
    }
    
    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found with this email." 
      });
    }
    
    // Generate new OTP
    const otpCode = generateOtp(email);
    
    // Send email with OTP
    await sendmail(
      email,
      "URL Shortener - New Verification Code",
      `Your new verification code is: ${otpCode}. This code will expire in 5 minutes.`,
      otpCode
    );
    
    res.status(200).json({ 
      success: true, 
      message: "New verification code sent to your email." 
    });
  } catch (err) {
    console.error("Resend OTP Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to resend verification code." 
    });
  }
});
