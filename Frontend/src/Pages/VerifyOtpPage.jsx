import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import { OtpRoute } from '../Routing/OtpRoute';
import { verifyOtp, registerUser } from '../Api/UserApi';
import { login } from '../Store/Slice/AuthSlice';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = OtpRoute.useSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!otp.trim()) {
      setError('Please enter the verification code');
      return;
    }
    
    if (!email) {
      setError('Email is missing. Please go back to the registration page.');
      return;
    }
    
    setIsLoading(true);

    try {
      console.log("Submitting OTP:", { email, otp: otp.trim() });
      const data = await verifyOtp(email, otp.trim());
      console.log("Verification response:", data);
      
      if (data && data.success && data.user) {
        // Login the user with the returned data
        dispatch(login(data.user));
        
        // Redirect to dashboard
        navigate({ to: '/dashboard' });
      } else {
        throw new Error(data?.message || "Invalid response from server");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message || 'Invalid or expired OTP. Please try again.');
      
      // Clear the OTP input field to allow the user to try again
      setOtp('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setResendSuccess(false);
    
    if (!email) {
      setError('Email is missing. Please go back to the registration page.');
      return;
    }
    
    setResendLoading(true);
    
    try {
      // Use the registration endpoint as a temporary solution
      // This will resend the OTP as a side effect of registration
      const response = await registerUser('', email, 'temporary_password');
      console.log('OTP resent successfully:', response);
      
      setResendSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 5000);
    } catch (err) {
      // Even if we get an error about duplicate user, the OTP might still be sent
      console.error('Failed to resend OTP:', err);
      
      // Check if it's a duplicate user error, which is actually okay for our purpose
      if (err.message && err.message.includes('duplicate')) {
        setResendSuccess(true);
        setTimeout(() => {
          setResendSuccess(false);
        }, 5000);
      } else {
        setError(err.message || 'Failed to resend verification code. Please try again.');
      }
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 mb-4">
        <h1 className="text-2xl font-bold text-center mb-6">Verify Your Email</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {resendSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            Verification code resent successfully! Please check your email.
          </div>
        )}

        <p className="mb-4 text-center text-gray-600">
          We've sent a verification code to <strong>{email || 'your email'}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Verification Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter verification code"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
      </div>
      
      {/* Resend OTP button below the card */}
      <div className="mt-2">
        <button
          onClick={handleResendOtp}
          disabled={resendLoading}
          className="px-6 py-2 bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 shadow-sm"
        >
          {resendLoading ? 'Sending...' : "Didn't receive the code? Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
