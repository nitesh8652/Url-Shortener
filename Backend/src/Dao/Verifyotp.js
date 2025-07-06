// Backend/src/Controller/authentication.Controller.js

import wrapAsync from "../Utils/TryCatch.js";
import { verifyOtp } from "../Services/Otp.js";
import { signToken } from "../Utils/helper.js";
import { cookieOptions } from "../config/Cookies.js";
import User from "../Models/UserModel.js";

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

  // 4) Issue JWT + set cookie
  const token = signToken(user._id);
  res.cookie("accessToken", token, cookieOptions);

  // 5) Return success + user
  res.json({
    success: true,
    message: "Email verified! You are now logged in.",
    user,
  });
});
