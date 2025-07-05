// Backend/src/Controller/authentication.Controller.js

import { registerUser, loginUser } from "../Services/authentication.Service.js";
import wrapAsync from "../Utils/TryCatch.js";
import { cookieOptions } from "../config/Cookies.js";
import { generateOtp, verifyOtp } from "../Services/Otp.js";
import User from "../Models/UserModel.js";
import { signToken } from "../Utils/helper.js";
import { sendmail } from "../Utils/Mail.js";

export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;

  // 1) Create the user (verified defaults to false)
  const { user } = await registerUser(name, email, password);

  // 2) Generate & send OTP
  const otp = generateOtp(user.email);
  await sendmail(
    user.email,
    "Verify your email",
    `Welcome, ${name}! Your verification code is ${otp}.`
  );

  // 3) Tell client to prompt for OTP
  res.status(201).json({
    success: true,
    message: "OTP sent to your email address.",
  });
});

export const verifyRegistration = wrapAsync(async (req, res) => {
  const { email, otp } = req.body;

  // 1) Verify the OTP
  if (!verifyOtp(email, otp)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired OTP.",
    });
  }

  // 2) Mark user as verified
  const user = await User.findOneAndUpdate(
    { email },
    { $set: { verified: true } },
    { new: true }
  );

  // 3) Issue JWT and set cookie
  const token = signToken(user._id);
  res.cookie("accessToken", token, cookieOptions);

  // 4) Respond with user + token
  res.json({
    success: true,
    message: "Email verified! You are now logged in.",
    user,
    token,
  });
});

export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser(email, password);

  // refuse if not verified
  if (!user.verified) {
    return res.status(400).json({
      success: false,
      message: "Please verify your email first.",
    });
  }

  // set cookie + respond
  res.cookie("accessToken", token, cookieOptions);
  res.json({
    success: true,
    message: "Login successful.",
    user,
  });
});

export const getOrigin = wrapAsync(async (req, res) => {
  // Must be used after authMiddleware
  res.json({
    success: true,
    message: "User verified.",
    user: req.user,
  });
});

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
  res.json({ success: true, message: "Logged out successfully." });
};
