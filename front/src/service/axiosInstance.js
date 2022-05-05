import axios from "axios";

const defaultHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
};
const defaultConfig = {
    baseURL: "http://127.0.0.1:8000/api",
    headers: defaultHeaders,
};

const getAxiosInstance = () => {
    return axios.create(defaultConfig);
};
export default getAxiosInstance;
