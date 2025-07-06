import { createRoute } from "@tanstack/react-router";
import OtpVerificationPage from "../Pages/OtpVerificationPAge";
import { rootRoute } from "./RouteTree";

export const OtpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify-otp",
  component: OtpVerificationPage,
  validateSearch:(search)=>({
    email:search.email || ""
,  })
});