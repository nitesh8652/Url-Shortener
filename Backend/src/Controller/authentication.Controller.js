import wrapAsync from "../Utils/TryCatch.js";
import { verifyOtp } from "../Services/Otp.js";
import User from "../Models/UserModel.js";
import { signToken } from "../Utils/helper.js";
import { cookieOptions } from "../config/Cookies.js";

export const verifyRegistration = wrapAsync(async (req, res) => {
  const { email, otp } = req.body;

  if (!verifyOtp(email, otp)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired OTP.'
    });
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
});
