import { createRoute } from "@tanstack/react-router";
import AuthenticationPage from "../Pages/AuthenticationPage";
import { rootRoute } from "./RouteTree";


export const AuthRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : '/loginpage',
    component : AuthenticationPage
})

