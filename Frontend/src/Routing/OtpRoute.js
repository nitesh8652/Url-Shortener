import { createRoute } from "@tanstack/react-router";
import VerifyOtpPage from "../Pages/VerifyOtpPage";
import { rootRoute } from "./RouteTree";

export const OtpRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/verify-otp',
    component: VerifyOtpPage
});