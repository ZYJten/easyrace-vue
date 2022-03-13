import request from '@/utils/request'

export const UsernamePasswordToLogin=(loginForm)=>{
    return request({
        url:'/login',
        method:'post',
        params: {
            username: loginForm.username,
            password: loginForm.password,
        },
    })
}

/*登录之后获取用户信息*/
export function getUserInfo() {
    return request({
        url: '/system/user/getUserInfo',
        method: 'GET'
    })
}

/*注销*/
export function doLogout() {
    return request({
        url: '/logout',
        method: 'POST'
    })
}
