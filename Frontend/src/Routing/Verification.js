// src/Routing/OtpRoute.js
import { createRoute } from '@tanstack/react-router'
import OtpRegistrationPage from '../Pages/OtpRegistrationPage'
import { rootRoute } from './RouteTree'

export const otpVerificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/verificationcode',
  component: OtpRegistrationPage,
})
    