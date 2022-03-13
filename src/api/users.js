import request from '@/utils/request'

/**
 *
 * @returns {AxiosPromise}
 */
export const findUsetList=(current,size,userVO)=>{
    return request({
        url:'/system/user/findUserPage',
        method:'post',
        params: {
            current,
            size,
        },
        data: userVO
    })
}

export const saveUser=(user)=>{
    return request({
        url:'/system/user/addUser',
        method:'post',
        data: user
    })
}
export const updateUser=(user)=>{
    return request({
        url:'/system/user/update',
        method:'post',
        data: user
    })
}

