export function verifyOtp(email, candidate) {
    console.log("Verifying OTP:", { email, candidate });
    
    const record = otpStore.get(email);
    console.log("OTP record found:", record);
    
    if (!record) {
        console.log("No OTP record found for email:", email);
        return false;
    }

    const { otp, expire } = record;
    console.log("Stored OTP:", otp);
    console.log("Candidate OTP:", candidate);
    console.log("Expiration:", new Date(expire));
    console.log("Current time:", new Date());
    console.log("Is expired:", Date.now() > expire);
    console.log("OTP match:", otp === candidate);

    if (Date.now() > expire || otp !== candidate) {
        console.log("OTP invalid or expired, deleting record");
        otpStore.delete(email);
        return false;
    }

    console.log("OTP valid, deleting record");
    otpStore.delete(email);
    return true;
}
