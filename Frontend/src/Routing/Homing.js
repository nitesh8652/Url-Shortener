 import { createRoute } from "@tanstack/react-router";
import Homepage from "../Pages/Homepage";
import { rootRoute } from "./RouteTree";
import AuthenticationPage from "../Pages/AuthenticationPage";

export const HomingRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : '/',
    component : Homepage
})