import {getMenuList} from '@/api/ready.js'

export default {
    state: {
        menuList: []
    },
    mutations: {
        setMenuList(state, menuList){
            state.menuList = menuList
        }
    },
    getters: {},
    actions: {
        // getMenuList({state,commit}){
        // 	console.log(state)
        // 	return new Promise((resolve,reject)=>{
        // 		getMenuList({},data=>{
        // 			commit('setMenuList',data.obj)
        // 		})
        // 		resolve();
        // 	})
        // }
    }
}
