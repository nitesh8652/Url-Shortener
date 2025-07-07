import React, { useState } from 'react';
import { verifyOtp } from '../Api/UserApi';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../Store/Slice/AuthSlice';

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pull the `email` query‐param from the URL (make sure your route declares validateSearch)
  const { email } = useSearch();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await verifyOtp(email, otp);
      
      // if backend returns a user object, dispatch it into Redux
      if (data.success && data.user) {
        dispatch(loginAction(data.user));
        navigate({ to: '/dashboard' });
      } else {
        setError(data.message || 'OTP verification failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid or expired OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Verify Your Email</h2>
        <p className="mb-4 text-gray-600 text-center">
          We sent a code to <strong>{email}</strong>
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/, ''))}
          maxLength={6}
          className="w-full px-3 py-2 border rounded mb-3"
          placeholder="Enter OTP"
          required
        />

        {error && <div className="mb-3 text-red-600 text-center">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Verifying…' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default OtpVerificationPage;
