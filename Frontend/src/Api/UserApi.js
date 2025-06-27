import axiosInstance from '../Utils/Axios'

export const loginUser = async (email, password) => {
    const {data} = await axiosInstance.post("/api/authentication/login", { email, password });
    return data;
};

export const RegisterUser = async (name, email, password) => {
    const {data} = await axiosInstance.post("/api/authentication/register", { name, email, password });
    return data;
};

export const LogoutUser = async () => {
    const {data} = await axiosInstance.get("/api/authentication/logout");
    return data;
};

export const checkAuthStatus = async () => {
    const {data} = await axiosInstance.get("/api/authentication/origin" ,{ withCredentials: true });
    return data;
};


export const getallurl = async () => {
    const {data} = await axiosInstance.get("/api/user/history");
    return data;
};