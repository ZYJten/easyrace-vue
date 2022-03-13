import request from '@/utils/request'

export const deleteAvatar = (fileURL)=>{
    return request({
        url:'/system/AliOss/delete',
        method:'post',
        params: {
            fileURL
        }
    })
}

export const uploadFile = (fileURL)=>{
    return request({
        url:'/system/AliOss/upload',
        method:'post',
        params: {
            fileURL
        }
    })
}
// export function fileUpload(fileobj) {
//     let param = new FormData()
//     param.append('files',fileobj.file)
//     return request({
//         method: 'post',
//         url: '/docmanager/upload',
//         headers: {'Content-Type':'multipart/form-data'},
//         data: param
//     })
// }
