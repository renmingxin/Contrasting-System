import axios from '@/libs/api.request'
import game from "../store/module/game";

//得到游戏列表
const getGameData_axios = (params, callback) => {
    axios.request({
        url: '/config/game/code',
        method: 'GET',
        params
    }).then(res => {
        callback(res)
    })
};
//得到所有游戏的分类
const getGameCategory_axios = (params,callbak)=>{
    axios.request({
        url:'/config/game/category',
        method:'GET',
        params
    }).then(res=>{
        callbak(res)
    })
}

//添加游戏
const sureaddGame_axios = (params, callback) => {
    axios.request({
        url: '/config/game/add',
        method: 'POST',
        data: params
    }).then(res => {
        callback(res)
    })
}
//修改游戏
const sureUpdateGame_axios = (params, callback) => {
    axios.request({
        url: '/config/game/update',
        method: 'POST',
        data: params
    }).then(res => {
        callback(res)
    })
}
//删除游戏
const deleteGame_axios = (gameCode, callback) => {
    axios.request({
        url: '/config/game/delete/'+ gameCode,
        method: 'DELETE',
        data: {}
    }).then(res => {
        callback(res)
    })
}
//点击某个游戏获得游戏所有的服务器列表
const getGameServerList_axios = (params,callbak)=>{
    axios.request({
        url:'/config/game/server/list',
        method:'GET',
        params
    }).then(res=>{
        callbak(res)
    })
}
//点击某个游戏获得游戏的平台列表
const getPlatformList_axios = (gameCode,callbak)=>{
    axios.request({
        url:'/config/game/platform/list/' + gameCode,
        method:'GET',
        params:{}
    }).then(res=>{
        callbak(res)
    })
}
//添加游戏服务器
const sureaddServer_axios = (params, callback) => {
    axios.request({
        url: '/config/game/server/add',
        method: 'POST',
        data: params
    }).then(res => {
        callback(res)
    })
}
//修改游戏服务器
const sureUpdateServer_axios = (params, callback) => {
    axios.request({
        url: '/config/game/server/update',
        method: 'POST',
        data: params
    }).then(res => {
        callback(res)
    })
}
//删除游戏服务器
const deleteServer_axios = (gameCode,params,callback) => {
    axios.request({
        url: '/config/game/server/delete/' + gameCode,
        method: 'POST',
        data: params
    }).then(res => {
        callback(res)
    })
}
//新增游戏平台
const sureaddPlatform_axios = (gameCode,params,callback) => {
    axios.request({
        url: '/config/game/platform/add/' + gameCode,
        method: 'POST',
        data: params
    }).then(res => {
        callback(res)
    })
}
//删除游戏平台
const deletePlatform_axios = (gameCode,params,callback) => {
    axios.request({
        url: '/config/game/platform/delete/' + gameCode,
        method: 'GET',
        params
    }).then(res => {
        callback(res)
    })
}
//得到渠道列表
const getDitchList_axios = (params,callback) => {
    axios.request({
        url: '/config/game/channel/list',
        method: 'GET',
        params
    }).then(res => {
        callback(res)
    })
}
//添加渠道
const sureaddDitch_axios = (params,callback) => {
    axios.request({
        url: '/config/game/channel/add',
        method: 'POST',
        data:params
    }).then(res => {
        callback(res)
    })
}
//修改渠道
const sureUpdateDitch_axios = (params,callback) => {
    axios.request({
        url: '/config/game/channel/update',
        method: 'POST',
        data:params
    }).then(res => {
        callback(res)
    })
}
//删除渠道
const deleteDitch_axios = (params,callback) => {
    axios.request({
        url: '/config/game/channel/delete',
        method: 'POST',
        data:params
    }).then(res => {
        callback(res)
    })
}
export {
    getGameData_axios,
    getGameCategory_axios,
    sureaddGame_axios,
    sureUpdateGame_axios,
    deleteGame_axios,
    getGameServerList_axios,
    getPlatformList_axios,
    sureaddServer_axios,
    sureUpdateServer_axios,
    deleteServer_axios,
    sureaddPlatform_axios,
    deletePlatform_axios,
    getDitchList_axios,
    sureaddDitch_axios,
    sureUpdateDitch_axios,
    deleteDitch_axios
}