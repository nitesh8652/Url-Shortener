import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout";
import { HomingRoute } from "./Homing";
import { AuthRoute } from "./AuthRoute";
import { RegisterRoute } from "./Register";
import { DashboardRoute } from "./Dashboard.jsx";
import { OtpRoute } from "./OtpRoute";
import { QrGenerator } from "./Qr";

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
