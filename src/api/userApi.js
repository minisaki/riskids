import axiosClient from "./axiosClient";


const userApi = {    
    register(data) {
        const url = '/user/';
        return axiosClient.post( url, data);
    },
    login(data) {
        const url = '/token/custom/';
        return axiosClient.post( url, data);
    },
    get(data) {
        const url = `/user/${data}/`;
        return axiosClient.get(url);
    },
};
export default userApi;