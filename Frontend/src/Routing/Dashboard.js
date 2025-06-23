import { createRoute } from "@tanstack/react-router";
import Homepage from "../Pages/Homepage";
import { rootRoute } from "./RouteTree";
import DashboardPage from "../Pages/DashboardPage";
import { checkAuthentication } from "../Utils/Check";

export const DashboardRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : '/dashboard',
    component : DashboardPage ,
    beforeLoad:checkAuthentication
})