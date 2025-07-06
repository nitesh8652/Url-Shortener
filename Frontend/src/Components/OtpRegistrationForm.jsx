import React, { useState } from 'react'
import { verifyOtp } from '../Api/UserApi'
import { useNavigate } from '@tanstack/react-router'

const OtpRegistrationForm = ({ email }) => {
  const [otp, setOtp] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    if (otp.length !== 4) {
      setErrorMessage('Please enter the 4‑digit OTP.')
      return
    }

    setIsLoading(true)
    try {
      const response = await verifyOtp(email, otp)
      if (response.success) {
        navigate({ to: '/dashboard' })
      } else {
        setErrorMessage(response.message || 'Invalid code.')
      }
    } catch {
      setErrorMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold text-center">Verify Your OTP</h2>

      <p className="text-sm text-gray-600 text-center">
        We sent a code to <span className="font-medium">{email}</span>
      </p>

      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
          One‑Time Password
        </label>
        <input
          id="otp"
          type="text"
          inputMode="numeric"
          pattern="\d{4}"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          disabled={isLoading}
          className="w-full text-center text-2xl tracking-widest px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="----"
          required
        />
      </div>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm text-center">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isLoading ? 'Verifying…' : 'Verify Code'}
      </button>
    </form>
  )
}

export default OtpRegistrationForm
