// src/Pages/OtpRegistrationPage.jsx
import React from 'react'
import { useRouter } from '@tanstack/react-router'
import OtpRegistrationForm from '../Components/OtpRegistrationForm'

const OtpRegistrationPage = () => {
  const router = useRouter()
  const email = router.state.search?.email || ''

  return (
    <div className="mt-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Enter Verification Code</h1>
      <OtpRegistrationForm email={email} />
    </div>
  )
}

export default OtpRegistrationPage
