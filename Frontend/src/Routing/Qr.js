 import { createRoute } from "@tanstack/react-router";
import QrPage from "../Pages/QrPage";
import { rootRoute } from "./RouteTree";


export const QrGenerator = createRoute({
    getParentRoute : () => rootRoute,
    path : '/qrgenerate',
    component : QrPage
})