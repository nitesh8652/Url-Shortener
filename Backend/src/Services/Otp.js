// Create a Map to store OTP records
const otpStore = new Map();

// Generate a random 6-digit OTP
export function generateOtp(email) {
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the OTP with a 5-minute expiration
    const expire = Date.now() + 5 * 60 * 1000; // 5 minutes from now
    
    // Save to our in-memory store
    otpStore.set(email, { otp, expire });
    
    console.log(`Generated OTP for ${email}: ${otp} (expires at ${new Date(expire)})`);
    
    return otp;
}

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
