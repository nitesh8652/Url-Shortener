
import { createRoute } from "@tanstack/react-router";
import Verification from "../Pages/Verification";
import { rootRoute } from "./RouteTree";


export const OtpForm = createRoute({
    getParentRoute : () => rootRoute,
    path : '/verification',
    component : Verification
})