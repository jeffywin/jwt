import axios from 'axios'
import router from '../src/router'
axios.defaults.baseURL = 'http://localhost:3000'
//axios 拦截器对拿到的数据进行拦截
axios.interceptors.response.use(function(res){
    if(res.data.code !== 0) {
        return Promise.reject(res.data.data)
    }
    return res.data;
},res=>{
    if(res.response.status === 401){ // 没权限
        router.history.push('/login');
    }
    return Promise.reject('Not Allowed');
});

//对发送的请求统一加上token
axios.interceptors.request.use(function(config){
    let token = localStorage.getItem('token')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default axios