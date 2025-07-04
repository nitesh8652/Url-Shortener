import { verifyOtp } from "../Services/Otp.js";
import {User} from "../Models/User.js"

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

    res.json({ success: true, message: 'Registration complete! You can now log in.' })
}; 