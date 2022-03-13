import request from '@/utils/request'

export const findType=()=>{
    return request({
        url:'/system/race-type/typeList',
        method:'get',
    })
}

export const addRaceReport=(race)=>{
    return request({
        url:'/system/race/addRace',
        method:'post',
        data: race
    })
}

export const selectAll=()=>{
    return request({
        url:'/system/race/select',
        method:'post',
    })
}

export const updateRace=(info)=>{
    return request({
        url:'/system/race-info/update',
        method:'post',
        data: info
    })
}
export const getInfo=()=>{
    return request({
        url:'/system/race-info/all',
        method:'get',
    })
}
export const getInfoList=()=>{
    return request({
        url:'/system/race/selectList',
        method:'get',
    })
}
export const getInfoById=(id)=>{
    return request({
        url:'/system/race-info/getInfoById',
        method:'get',
        params: {
            id
        }
    })
}
export const getByInfoId=(id)=>{
    return request({
        url:'/system/race/getByInfoId',
        method:'get',
        params: {
            id
        }
    })
}
export const saveSOP=(sop, id)=>{
    return request({
        url:'/system/race-info/saveSOP',
        method:'get',
        params: {
            sop,
            id
        }
    })
}
export const getList=(id)=>{
    return request({
        url:'/system/race-info/list',
        method:'get',
        params: {
            id
        }
    })
}
export const getAssessors=(id)=>{
    return request({
        url:'/system/race/getAssessors',
        method:'get',
    })
}
export const racing=()=>{
    return request({
        url:'/system/race/racing',
        method:'get',
    })
}
export const racingList=(id)=>{
    return request({
        url:'/system/race/racingList',
        method:'get',
        params: {
            id
        }
    })
}

