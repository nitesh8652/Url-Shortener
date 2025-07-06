// src/Routing/RouteTree.js
import { createRootRoute } from '@tanstack/react-router'
import RootLayout from '../RootLayout'
import { HomingRoute } from './Homing'
import { AuthRoute }  from './AuthRoute'
import { DashboardRoute } from './Dashboard'
import { QrGenerator } from './Qr'


export const rootRoute = createRootRoute({
  component: RootLayout,
})

export const routeTree = rootRoute.addChildren([
  HomingRoute,
  AuthRoute,
  DashboardRoute,
  QrGenerator,
  
])
