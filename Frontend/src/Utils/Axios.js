import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://url-shortener-z9f3.onrender.com',
    timeout: 10000,
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    console.error("Bad Request: ", data);
                    break;
                case 401:
                    console.error("Unauthorized: ", data);
                    break;
                case 404:
                    console.error("Not Found: ", data);
                    break;
                case 500:
                    console.error("Internal Server Error: ", data);
                    break;
                default:
                    console.error("An error occurred: ", data);
            }
        } else if (error.request) {
            console.error("No Response", error.request);
        } else {
            console.error("Error", error.message);
        }

        return Promise.reject({
            message: error.response?.data?.message || error.message || "An error occurred",
            status: error.response?.status,
            data: error.response?.data,
            originalError: error
        });
    }
);

export default axiosInstance;