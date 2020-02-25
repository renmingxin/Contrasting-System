import HttpRequest from '@/libs/axios'
let baseUrl;
if(process.env.NODE_ENV === 'production'){
    baseUrl = location.href.split("://")[0] + "://" + location.href.split("://")[1].split("/")[0];
}else {
    baseUrl = location.href.split("://")[0] + "://" + location.href.split("://")[1].split(":")[0] + ':80';
    // baseUrl = "http://192.168.2.105:8080"; 
    baseUrl = "http://172.16.8.22:8080"; 
}
window.baseUrl = baseUrl;
let axios = new HttpRequest(baseUrl);
export default axios;
