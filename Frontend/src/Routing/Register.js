import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./RouteTree";
import Register from "../Components/Register.jsx";


 export const RegisterRoute = createRoute({
    getParentRoute : () => rootRoute,
    path:"/register",
    component:Register
})