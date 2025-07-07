import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout";
import { HomeRoute } from "./Home";
import { LoginRoute } from "./Login";
import { RegisterRoute } from "./Register";
import { DashboardRoute } from "./Dashboard.jsx";
import { OtpRoute } from "./OtpRoute";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

export const routeTree = rootRoute.addChildren([
  HomeRoute,
  LoginRoute,
  RegisterRoute,
  DashboardRoute,
  OtpRoute,
])
