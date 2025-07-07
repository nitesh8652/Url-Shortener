import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./RouteTree";
import DashboardPage from "../Pages/DashboardPage";
import { checkAuthentication } from "../Utils/Check";

export const DashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
  beforeLoad: async ({ context }) => {
    try {
      const isAuthenticated = await checkAuthentication({ context });
      if (!isAuthenticated) {
        throw new Error('You must be logged in to access this page');
      }
      return { isAuthenticated };
    } catch (error) {
      throw error;
    }
  },
  onError: ({ error }) => {
    console.error('Dashboard route error:', error);
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        {error.message || 'An error occurred. Please try again.'}
      </div>
    );
  }
})
