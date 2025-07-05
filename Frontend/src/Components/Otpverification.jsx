import React, { useState } from "react";
import { verifyOtp } from "../Api/UserApi";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { login } from "../Store/Slice/AuthSlice";

const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await verifyOtp(email, otp);
      dispatch(login(data.user)); // update redux state
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed.');
    }
  };

  return (
    <form onSubmit={handleVerify} className="flex flex-col gap-3">
      <label>Enter OTP sent to {email}:</label>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        maxLength={6}
        className="border px-2 py-1"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Verify OTP
      </button>
    </form>
  );
};

export default OtpVerification;