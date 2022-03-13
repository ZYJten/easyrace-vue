import request from '@/utils/request'

export const findColAndCount=()=>{
    return request({
        url:'/system/college/findColAndCount',
        method:'get',
    })
}
