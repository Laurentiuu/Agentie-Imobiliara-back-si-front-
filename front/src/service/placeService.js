import getAxiosInstance from "./axiosInstance";

export const getAllPlaces = async () =>{
    try {
        const response = await getAxiosInstance().get(`/getAllPlaces`);

        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
}

export const savePlace = async (place) => {
    try {
        const response = await getAxiosInstance().post(`/createPlace`, place);
        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
};

export const getSaleHouses = async () =>{
    try {
        const response = await getAxiosInstance().get("/vanzariCase");
        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
}

export const getSaleApartments = async () =>{
    try {
        const response = await getAxiosInstance().get("/vanzariApartamente");

        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
}

export const getSaleSingleRooms = async () =>{
    try {
        const response = await getAxiosInstance().get("/vanzariGarsoniere");

        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
}

export const getRentHouses = async () =>{
    try {
        const response = await getAxiosInstance().get("/inchirieriCase");
        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
}

export const getRentApartments = async () =>{
    try {
        const response = await getAxiosInstance().get("/inchirieriApartamente");

        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
}

export const getRentSingleRooms = async () =>{
    try {
        const response = await getAxiosInstance().get("/inchirieriGarsoniere");

        return response;
    } catch (error) {
        alert("Nu merge serverul")
    }
}