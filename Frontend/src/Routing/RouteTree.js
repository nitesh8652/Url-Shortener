import { createRootRoute, createRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout";
import { HomingRoute } from "./Homing";
import { AuthRoute } from "./AuthRoute";
import { DashboardRoute } from "./Dashboard"; // Fixed extension
import { OtpRoute } from "./OtpRoute";
import { QrGenerator } from "./Qr";
import {RegisterRoute} from './Register'; // Fixed typo

export const rootRoute = createRootRoute({
  component: RootLayout,
});

export const routeTree = rootRoute.addChildren([
  HomingRoute,
  AuthRoute,
  RegisterRoute,
  DashboardRoute,
  OtpRoute,
  QrGenerator,
])
