import request from '@/utils/request'

export const toReview=(result,sid)=>{
    return request({
        url:'/system/result/save',
        method:'post',
        data: result,
        params: {
            sid
        }
    })
}
export const gainResult=()=>{
    return request({
        url:'/system/result/gain',
        method:'get',
    })
}
