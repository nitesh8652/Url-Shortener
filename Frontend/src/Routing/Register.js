import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout";
import Register from "../Components/Register.jsx";


const registerroute = createRoute({
    getParentRoute : () => rootRoute,
    path:"/register",
    component:Register
})