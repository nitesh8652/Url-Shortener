import { verifyOtp } from "../Services/Otp.js";


export const verifyRegistration = async (req, res) => {

    const { email, otp } = req.body
    if (!verifyotp(email, otpvalidate)) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' })
    }

    res.json({ success: true, message: 'Registration complete! You can now log in.' })
}; 