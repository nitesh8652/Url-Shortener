const [step, setStep] = useState("register"); // or "otp"
const [registeredEmail, setRegisteredEmail] = useState("");

const handleRegister = async (e) => {
  // ...registration logic...
  try {
    await RegisterUser(name, email, password);
    setRegisteredEmail(email);
    setStep("otp");
  } catch (err) {
    // handle error
  }
};

return (
  <>
    {step === "register" ? (
      // ...registration form...
    ) : (
      <OtpVerification email={registeredEmail} />
    )}
  </>
);