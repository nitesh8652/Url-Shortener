import { useLocation } from 'react-router-dom';
import OtpRegistrationForm from '../Components/OtpRegistrationForm';

const OtpRegistrationPage = () => {
  const location = useLocation();
  const email = location.state?.email || '';

  return (
    <div>
      <h2>Verify Your OTP</h2>
      <OtpRegistrationForm email={email} />
    </div>
  );
};