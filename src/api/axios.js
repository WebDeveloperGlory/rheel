import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://apidoc.rheel.ng/", // Replace with your API's base URL
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
});
  
  export default axiosInstance;