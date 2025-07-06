import React, { useState } from "react";
import { verifyOtp } from "../Api/UserApi";
import { useSearch } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { email } = useSearch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await verifyOtp(email, otp);
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err.message || "Invalid or expired OTP.");
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
        <h2 className="text-xl font-semibold mb-4 text-center">Verify Email</h2>
        <p className="mb-4 text-gray-600 text-center">
          Enter the OTP sent to <b>{email}</b>
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-3"
          placeholder="Enter OTP"
          required
        />
        {error && (
          <div className="mb-3 text-red-600 text-center">{error}</div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default OtpVerificationPage;