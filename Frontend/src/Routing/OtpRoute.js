// src/Routing/OtpRoute.js
import { createRoute } from '@tanstack/react-router'
import OtpRegistrationPage from '../Pages/OtpRegistrationPage'
import { rootRoute } from './RouteTree'  // this import is fine because RouteTree only exports the root

export const otpVerificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/verificationcode',
  component: OtpRegistrationPage,
})
