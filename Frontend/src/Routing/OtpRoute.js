import { createRoute } from "@tanstack/react-router";
import OtpVerificationPage from "../Pages/OtpVerificationPage.jsx";
import { rootRoute } from "./RouteTree";

export const OtpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify-otp",
  component: OtpVerificationPage,
  validateSearch:(search)=>({
    email:search.email || ""
,  })
});