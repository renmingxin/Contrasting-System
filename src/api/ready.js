import axios from '@/libs/api.request'

export const getUserInfo = (params, callback) => {
    axios.request({
        url: '/login',
        method: 'POST',
        data: params
    }).then(res => {
        callback(res)
    })
}

export const getMenuList = (params, callback) => {
    axios.request({
        url: '/admin/api/menu',
        method: 'GET',
        data: params
    }).then(res => {
        callback(res)
    })
};
