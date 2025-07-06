// src/Routing/OtpRoute.js
import { createRoute } from '@tanstack/react-router'
import { rootRoute }        from './RouteTree'
import OtpRegistrationPage  from '../Pages/OtpRegistrationPage'

export const otpVerificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path:           '/verificationcode',
  component:      OtpRegistrationPage,
})
