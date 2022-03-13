import request from '@/utils/request'

export const myTeam=(raceId)=>{
    return request({
        url:'/system/team/myTeam',
        method:'post',
        params: {
            raceId
        }
    })
}
