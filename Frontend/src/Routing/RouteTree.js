import { createRootRoute } from '@tanstack/react-router'
import RootLayout from '../RootLayout'
import { HomingRoute } from './Homing'
import { AuthRoute  } from './AuthRoute'
import { DashboardRoute } from './Dashboard'
import { QrGenerator } from './Qr'
import { otpVerificationRoute } from './OtpRoute'
import ErrorBoundary from '../ErrorBoundary'  // Make sure to create this component

export const rootRoute = createRootRoute({
  component: () => (
    <ErrorBoundary>
      <RootLayout />
    </ErrorBoundary>
  ),
})

export const routeTree = rootRoute.addChildren([
  HomingRoute,
  AuthRoute,
  DashboardRoute,
  QrGenerator,
  otpVerificationRoute,
])