import axios from "axios";

// Axios는 브라우저 및 node.js를 위한 Promise API를 활용하는 
//HTTP 비동기 통신 라이브러리이다
// 백엔드와 프론트엔드의 통신을 쉽게하기 위해 Ajax와 더불어 사용
// 내장된 fetch 메소드를 사용해도 된다 fetch => response => json

// npm install axios 설치하기

// Axios 인스터스화 하기 => 중복으로 쓸 주소 부분을 baseURL로 처리하면 편리
// PROD 배포된 운영환경이 맞다면 그 주소를 넣어주고 개발환경일 때에는 localhost를 넣어준다

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