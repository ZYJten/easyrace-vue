import request from '@/utils/request'

/**
 * 菜单
 * @returns {AxiosPromise}
 */
export const createMenuT=()=>{
    return request({
        url:'/system/menu-t',
        method:'get',
    })
}
/**
 *
 * @returns {AxiosPromise}
 */
export const createMenuS=()=>{
    return request({
        url:'/system/menu-s',
        method:'get',
    })
}
