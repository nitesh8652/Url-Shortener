import React from 'react';
import { useNavigate } from 'react-router-dom';
import OtpRegistrationForm from '../Components/OtpRegistrationForm';
import { useSelector } from 'react-redux';

const OtpRegistrationPage = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (auth.user) {
      navigate('/dashboard');
    }
  }, [auth.user, navigate]);

  return (
    <div>
      <h2>Verify Your OTP</h2>
      <OtpRegistrationForm />
    </div>
  );
};

export default OtpRegistrationPage;