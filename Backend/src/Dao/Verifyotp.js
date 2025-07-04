import { verifyOtp } from "../Services/Otp.js";
import { signToken } from "../Utils/helper.js";
import { cookieOptions } from "../config/Cookies.js";
import User from "../models/UserModel.js"

export const verifyRegistration = async (req, res) => {

    const { email, otp } = req.body
    if (!verifyOtp(email, otpvalidate)) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' })
    }

    await User.updateOne({
        email
    },{
        $set:{
            verified: true
        }
    })

    const user = await User.findOne({email})
    const token = signToken({ id: user._id });
    res.cookie("accessToken",token,cookieOptions)

    res.json({ success: true, message: 'Registration complete! You can now log in.' })
}; 