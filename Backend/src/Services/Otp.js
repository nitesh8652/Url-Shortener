import { customAlphabet } from "nanoid";

const otpStore = new Map()

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)

export function generateOtp(email) {
    const otp = nanoid()
    const expire = new Date.now() + 5* 60 * 1000

    otpStore.set(email,{
        otp,
        expire
    })
    return otp

}


export function verifyOtp(email, candidate){

    const record = otpStore.get(email)
    if(!record) return false

    const {otp,expire} = record

    if(Date.now() > expire || otp !== candidate) {
        otpStore.delete(email)
        return false
    }

    otpStore.delete(email)
  return true

}

