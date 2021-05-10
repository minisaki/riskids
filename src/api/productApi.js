import axiosClient from "./axiosClient";


const productApi = {
    async getAll(params){
        const url = '/products/';
        // const url_count = '/products/count';
        const newParams = {...params}
        // newParams._start = !params._page || params._page <= 1 
        //     ? 0
        //     : (params._page - 1) * (params._limit || 50);
        
        // delete newParams._page
        const productList = await axiosClient.get( url, {params: newParams})
        // const productList = await axiosClient.get( url, {params: newParams})
        // const count = await axiosClient.get( url_count, {params: newParams})
        
        return {
            data: productList.results,
            pagination: {
                page: params.page ? params.page : 1,
                total: Math.ceil(productList.count / 20),
            }
        };
    },
    async get(id) {
        const url =  `/products/${id}`;
        return await axiosClient.get(url);
    },
    
    add(data) {
        const url = '/products';
        return axiosClient.post( url, data);
    },
    update(data) {
        const url =  `/products/${data.id}`;
        return axiosClient.patch(url, data);
    },
    remove(id) {
        const url =  `/products/${id}`;
        return axiosClient.delete(url);
    }
};
export default productApi;