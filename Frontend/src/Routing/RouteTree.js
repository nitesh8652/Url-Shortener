import { createRootRoute, createRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout";
import { HomingRoute } from "./Homing";
import { AuthRoute } from "./AuthRoute";
import { DashboardRoute } from "./Dashboard"; 
import { OtpRoute } from "./OtpRoute";
import { QrGenerator } from "./Qr";
import Register from "../Components/Register.jsx";

// Create a route for Register component
const RegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register
});

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
