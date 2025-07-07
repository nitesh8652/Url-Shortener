import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import { OtpRoute } from '../Routing/OtpRoute';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
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
    
    setIsLoading(true);

    try {
      // Replace this with your actual API call
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify OTP');
      }
      
      // Login the user with the returned data
      dispatch({ type: 'auth/login', payload: data.user });
      navigate({ to: '/dashboard' });
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Verify Your Email</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
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
    </div>
  );
};

export default VerifyOtpPage;
