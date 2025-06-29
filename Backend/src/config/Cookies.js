export const cookieOptions = {
    httpOnly: true, 
    secure: true, 
    sameSite: 'None', 
    // secure: process.env.NODE_ENV === 'production', 
    // sameSite: 'lax', 
    maxAge: 1000 * 60 * 60, 
}