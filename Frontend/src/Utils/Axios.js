import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://url-shortener-z9f3.onrender.com',
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`Response from ${response.config.url}:`, response.status);
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            console.error(`Error ${status} from ${error.config.url}:`, data);

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
