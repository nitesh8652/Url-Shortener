import React from 'react'
import { useRouter } from '@tanstack/react-router'
import OtpRegistrationForm from '../Components/OtpRegistrationForm'

const OtpRegistrationPage = () => {
  const router = useRouter()
  // pull 'email' out of whatever state you passed at navigation time
  const email = router.state?.search?.email || ''

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">Enter Your Verification Code</h1>
      <OtpRegistrationForm email={email} />
    </div>
  )
}

export default OtpRegistrationPage
