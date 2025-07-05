// Backend/src/Controller/authentication.Controller.js

import { registerUser, loginUser } from "../Services/authentication.Service.js";
import wrapAsync from "../Utils/TryCatch.js";
import { cookieOptions } from "../config/Cookies.js";
import { signToken } from "../Utils/helper.js";
import { sendmail } from "../Utils/Mail.js";
import { generateOtp, verifyOtp } from "../Services/Otp.js";
import User from "../Models/UserModel.js";

export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;

  // 1) Create user with verified: false
  const { user } = await registerUser(name, email, password);

  // 2) Generate & email the OTP
  const otp = generateOtp(user.email);
  await sendmail(
    user.email,
    "Verify your Email",
    `Hello ${user.username || name}, your verification code is: ${otp}`
  );

  // 3) Tell the front‑end to prompt the OTP form
  res
    .status(201)
    .json({ success: true, message: "OTP sent to your email address." });
});

export const verifyRegistration = wrapAsync(async (req, res) => {
  const { email, otp } = req.body;

  // 1) Check the OTP
  if (!verifyOtp(email, otp)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired OTP." });
  }

  // 2) Mark user as verified
  const user = await User.findOneAndUpdate(
    { email },
    { $set: { verified: true } },
    { new: true }
  );

  // 3) Sign a JWT and set the cookie
  const token = signToken(user._id);
  res.cookie("accessToken", token, cookieOptions);

  // 4) Return success + user + token
  res.json({
    success: true,
    message: "Registration complete! You are now logged in.",
    user,
    token,
  });
});

export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  // 1) Authenticate
  const { user, token } = await loginUser(email, password);

  // 2) Refuse if not yet verified
  if (!user.verified) {
    return res
      .status(400)
      .json({ success: false, message: "Please verify your email first." });
  }

  // 3) Otherwise set cookie + return
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({
    success: true,
    message: "Login successful.",
    user,
  });
});

export const getOrigin = wrapAsync(async (req, res) => {
  // Protected route — authMiddleware has attached req.user
  res.json({
    success: true,
    message: "User verified.",
    user: req.user,
  });
});

export const logout = (req, res) => {
  // Clear the cookie (options must match how it was set)
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
  res.json({ success: true, message: "Logged out successfully." });
};
