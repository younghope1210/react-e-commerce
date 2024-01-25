import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ?
    '' : 'http://localhost:4000'
});

// 요청 헤더에 'Bearer ' + localStorage.getItem('accessToken') 요청보냄
axiosInstance.interceptors.request.use(function (config){

    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    return config;

}, function(error){
    
    return Promise.reject(error);
})

//토큰이 만료되었을 때 처리

axiosInstance.interceptors.response.use(function(response){

    return response;

}, function(error){
    if(error.response.data === 'jwt expired') {
        window.location.reload();
    }
    return Promise.reject(error);
})



export default axiosInstance;