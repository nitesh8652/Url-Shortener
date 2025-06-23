import RootLayout from "../RootLayout"
import { createRootRoute } from "@tanstack/react-router";
import {HomingRoute} from "./Homing"
import {AuthRoute} from "./AuthRoute.js"
import {DashboardRoute} from "./Dashboard"



export const rootRoute = createRootRoute({
    component: RootLayout ,
})

 

//  rootRoute.addChildern([indexRoute, aboutRoute])


export const routeTree = rootRoute.addChildren([
  HomingRoute,
  AuthRoute,
  DashboardRoute
]);

