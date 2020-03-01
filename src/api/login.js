import axios from '@/libs/api.request'
import Qs from 'qs'

export const getUserInfo = (params,callback)=>{
    axios.request({
        url:'/login',
        method:'POST',
        data: params,
    }).then(res=>{
        console.log(res);
        callback.onOk(res)
    }).catch(rj=>{
        console.log(rj)
        callback.onError(rj)
    })
    
}
