import getAxiosInstance from "./axiosInstance";

export const getAllAppointments = async (idPlace) => {
    try {
        const response = await getAxiosInstance().post(`/getAllAppointments`, {
            idPlace: idPlace,
            });
        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
};

export const getAppointments = async (idPlace) => {
    try {
        const response = await getAxiosInstance().post(`/getAppointments`, {
            idPlace: idPlace,
            });
        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
};


export const storeAppointment = async (user) => {
    try {
        const response = await getAxiosInstance().post(`/storeAppointment`, user);
        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
};
