import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout";
import Register from "../Components/Register.jsx";


 export const RegisterRoute = createRoute({
    getParentRoute : () => rootRoute,
    path:"/register",
    component:Register
})