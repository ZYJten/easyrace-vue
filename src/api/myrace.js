import request from '@/utils/request'

export const MyRace=()=>{
    return request({
        url:'/system/race/myRace',
        method:'get',
    })
}
export const MyTeamRace=(teamId)=>{
    return request({
        url:'/system/race/myTeamRace',
        method:'post',
        params:{
            teamId
        }
    })
}
export const uploadFile=(file,rid)=>{
    return request({
        url:'/system/file/upload',
        method:'post',
        params: {
            title: file.workTitle,
            work: file.workUrl,
            rid
        }
    })
}
export const signUp=(id, raceClass, tid)=>{
    return request({
        url:'/system/race-member/signup',
        method:'post',
        params: {
            id,
            raceClass,
            tid
        }
    })
}
export const create=(team)=>{
    return request({
        url:'/system/team/create',
        method:'post',
        data: team
    })
}
export const all=()=>{
    return request({
        url:'/system/team/myAll',
        method:'get',
    })
}
export const ListAll=()=>{
    return request({
        url:'/system/team/ListAll',
        method:'get',
    })
}
