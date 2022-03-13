import request from '@/utils/request'

export const up=(notice, id)=>{
    return request({
        url:'/system/notice/up',
        method:'post',
        data: notice,
        params: {
            id
        }
    })
}
export const list=(notice, id)=>{
    return request({
        url:'/system/notice/list',
        method:'get',
    })
}
