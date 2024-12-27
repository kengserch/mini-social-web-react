import axios from "axios";

const AxiosInstance = axios.create({ baseURL: "http://localhost:8000" });

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>  Promise.reject(error)
);

export default AxiosInstance;