import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://apidoc.rheel.ng/", // API base URL
    timeout: 1000000000, // 1 hour timeout
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Attach Token to Every Request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken"); // Check both storages

        console.log("Attaching Token:", token); // Debugging

        if (token) {
            config.headers.Authorization = token; // No "Bearer"
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle Expired Tokens (403 or 401)
axiosInstance.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            console.error("Token expired or unauthorized. Redirecting to login...");
            localStorage.removeItem("authToken");
            sessionStorage.removeItem("authToken"); // Remove from both storages
            window.location.href = "/login"; // Redirect user to login page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
