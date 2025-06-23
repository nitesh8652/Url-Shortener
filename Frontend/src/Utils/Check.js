import { checkAuthStatus } from "../Api/UserApi.js";
import { redirect } from "@tanstack/react-router";
import { login } from "../Store/Slice/AuthSlice.js";

export const checkAuthentication = async ({ context }) => {
  try {
    const { queryClient, store } = context;
    const response = await queryClient.ensureQueryData({
      queryKey: ["Current Origin"],
      queryFn: checkAuthStatus,
    });
    
    if (!response || !response.user) return false;
    
    store.dispatch(login(response.user));
    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) return false;
    
    return true;
  } catch (error) {
    return redirect({ to: "/" });
  }
};