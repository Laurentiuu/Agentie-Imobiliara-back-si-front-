import getAxiosInstance from "./axiosInstance";

export const getAllUsers = async () => {
    try {
        const response = await getAxiosInstance().get(`/getUsers`);
        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
};

export const addUser = async (user) => {
    try {
        const response = await getAxiosInstance().post(`/createUser`, user);
        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
};

export const updateUser = async (user) => {
    try {
        const response = await getAxiosInstance().post(`/updateUser`, user);
        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
};

export const updateFavorites = async (user) => {
    try {
        const response = await getAxiosInstance().post(`/updateFavorites`, user);
        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
};