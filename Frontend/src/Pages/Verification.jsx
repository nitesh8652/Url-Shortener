// src/Components/OtpForm.jsx
import React, { useState } from 'react'
import { verifyOtp } from '../Api/UserApi'      // your API call
import { useNavigate } from '@tanstack/react-router'

const OtpForm = ({ email }) => {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (otp.length !== 4) {
      setError('Please enter the 4‑digit code.')
      return
    }
    setLoading(true)
    try {
      await verifyOtp(email, otp)            // POST /api/authentication/verify-otp
      // on success, go to login or dashboard
      navigate({ to: '/login' })
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired code.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Enter the 4‑digit code
      </h2>

      <p className="text-sm text-gray-600 mb-4 text-center">
        We’ve sent a verification code to <span className="font-medium">{email}</span>.
      </p>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          inputMode="numeric"
          pattern="\d{4}"
          maxLength={4}
          value={otp}
          onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
          className="w-full text-center text-2xl tracking-widest px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="----"
          disabled={loading}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Verifying…' : 'Verify Code'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        Didn’t receive it?{' '}
        <button
          onClick={() => window.location.reload()}  // or trigger your “resend” API
          className="text-blue-600 hover:underline"
        >
          Resend code
        </button>
      </p>
    </div>
  )
}

export default OtpForm
