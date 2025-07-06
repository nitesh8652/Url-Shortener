import RootLayout from "../RootLayout"
import { createRootRoute } from "@tanstack/react-router";
import {HomingRoute} from "./Homing"
import {AuthRoute} from "./AuthRoute.js"
import {DashboardRoute} from "./Dashboard"
import {QrGenerator} from "./Qr.js"
import {otpverificationRoute} from "./Verification.js"



export const rootRoute = createRootRoute({
    component: RootLayout ,
})

 

export const routeTree = rootRoute.addChildren([
  HomingRoute,
  AuthRoute,
  DashboardRoute,
  QrGenerator,
  otpverificationRoute
]);

