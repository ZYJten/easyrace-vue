import axios from "axios";
import {ElementUIComponent} from "el-table-bar-base";
import NProgress from 'nprogress'
import store from '../store'

const instance = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 3000,
    // headers: {'X-Custom-Header': 'foobar'}
});
// 请求拦截
instance.interceptors.request.use(
    (config) => {
        // 在请求头提供token
        const token = store.getters.token || window.sessionStorage.getItem('token')
        console.log("token" , token)
        if (token) {
            //每次请求都会携带token
            config.headers.Authorization = token
        }
        NProgress.start()
        return config
    },
    (err) => Promise.reject(err)
)
// 响应拦截
instance.interceptors.response.use(
    (result) => {
        NProgress.done()
        if( result.code == '404'){
            console.log("404---------------<>")
        }
        return result
    },
    (err) => Promise.reject(err)
)
export default instance;
