import React, { useState } from 'react';
import { verifyOtp } from '../Api/UserApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const OtpRegistrationForm = ({ email: initialEmail }) => {
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await verifyOtp(email, otp);
      if (response.success) {
        dispatch(setUser(response.user));
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid code');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Verify OTP</h2>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>OTP:</label>
                <input 
                    type="text" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    required 
                />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit">Verify OTP</button>
        </form>
    );
};

export default OtpRegistrationForm;