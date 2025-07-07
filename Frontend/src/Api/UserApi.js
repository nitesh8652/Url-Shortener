import axiosInstance from '../Utils/Axios';

// Add the missing export for getallurl
export const getallurl = async () => {
  const { data } = await axiosInstance.get('/api/user/history');
  return data;
};

export const registerUser = async (name, email, password) => {
  const { data } = await axiosInstance.post('/api/authentication/register', {
    name,
    email,
    password
  });
  return data;
};

export const loginUser = async (email, password) => {
  const { data } = await axiosInstance.post('/api/authentication/login', {
    email,
    password
  });
  return data;
};

export const LogoutUser = async () => {
  const { data } = await axiosInstance.get('/api/authentication/logout');
  return data;
};

export const verifyOtp = async (email, otp) => {
  console.log("Verifying OTP:", { email, otp });
  
  try {
    const response = await axiosInstance.post("/api/authentication/register/verify-otp", { 
      email, 
      otp 
    });
    
    console.log("OTP verification response:", response.data);
    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error);
    throw {
      message: error.message || 'Failed to verify OTP. Please try again.',
      status: error.status,
      data: error.data,
    };
  }
};

export const checkAuthStatus = async () => {
  const { data } = await axiosInstance.get("/api/authentication/me", { withCredentials: true });
  return data;
};

export const resendOtp = async (email) => {
  try {
    const { data } = await axiosInstance.post('/api/authentication/resend-otp', { email });
    return data;
  } catch (error) {
    console.error("Resend OTP error:", error);
    throw {
      message: error.message || 'Failed to resend OTP. Please try again.',
      status: error.status,
      data: error.data,
    };
  }
};
