 import { createRoute } from "@tanstack/react-router";
import Homepage from "../Pages/Homepage";
import { rootRoute } from "./RouteTree";
import AuthenticationPage from "../Pages/AuthenticationPage";
import OtpRegistrationPage from "../Pages/OtpRegistrationPage";

export const otpverification = createRoute({
    getParentRoute : () => rootRoute,
    navigate :('/verificationcode',{
        state:{email}
    }) ,
    component : OtpRegistrationPage
})