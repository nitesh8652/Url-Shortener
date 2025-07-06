import { useRouter } from '@tanstack/react-router';
import OtpRegistrationForm from '../Components/OtpRegistrationForm';

const OtpRegistrationPage = () => {
  const router = useRouter();
  const email = router.state?.email || '';

  return (
    <div>
      <h2>Verify Your OTP</h2>
      <OtpRegistrationForm email={email} />
    </div>
  );
};

export default OtpRegistrationPage;