import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./RouteTree";
import VerifyOtpPage from "../Pages/VerifyOtpPage";

export const OtpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/verify-otp',
  validateSearch: (search) => ({
    email: search.email || '',
  }),
  component: VerifyOtpPage,
});
