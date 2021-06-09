import axiosClient from "./axiosClient";


const orderApi = {    
    create(data) {
        const url = '/creatOrder/';
        const token = localStorage.getItem('access_token')
        if (token) {
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        
        return axiosClient.post( url, data);
    },
    get() {
        const url = '/creatOrder/';
        const token = localStorage.getItem('access_token')
        if (token) {
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return axiosClient.get( url);
        
    },
};
export default orderApi;