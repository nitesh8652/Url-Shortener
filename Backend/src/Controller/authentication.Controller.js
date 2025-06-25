// import { registerUser, loginUser } from "../Services/authentication.Service.js";
// import wrapAsync from "../Utils/TryCatch.js";
// import { cookieOptions } from "../config/Cookies.js";
// import { signToken } from "../Utils/helper.js";
// import bcrypt from "bcrypt";

// export const register = wrapAsync(async (req, res) => {

//     try{

//         const { name, email, password } = req.body;
//         const { user, token } = await registerUser(name, email, password);
//         req.user = user; 
//         res.cookie('accessToken', token, cookieOptions)
//         res.status(201).json({
//             success: true,
//             message: "Login Successfull",
//             user, token
//         });
        
//     }catch (err) {
//         console.error("Registration Error:", err.message);  
//     }

// });


// export const login = wrapAsync(async (req, res) => {
//     const { email, password } = req.body;
//     const { token, user } = await loginUser(email, password);
    
//     // Set the cookie with the correct name
//     res.cookie('accessToken', token, cookieOptions);
    
//     console.log('Setting cookie:', 'accessToken', token);
    
//     res.status(200).json({
//         success: true,
//         message: "Login Successful",
//         user
//     });
// });

// export const getOrigin = wrapAsync(async (req, res) => {
//     console.log('User in request:', req.user);
//     res.status(200).json({
//         success: true,
//         message: "User Verified",
//         user: req.user
//     });

// }); 






import jwt from 'jsonwebtoken';

app.post('/api/authentication/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user from database
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  // 3. Create JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  // 4. Set cookie with token (IMPORTANT)
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,             // REQUIRED for HTTPS
    sameSite: 'None',         // REQUIRED for cross-site (frontend on another domain)
  });

  // 5. Return success response
  res.status(200).json({ user });
});
