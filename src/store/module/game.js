// import { http } from '../../lib/axios.js';
export default {
    state: {
        gameName:'',//当前选择的游戏
        gameList:[],//游戏下拉框
        completePlatform:[],//整个平台服务器渠道信息
        channelMap:{},//全渠道ID：Name映射Map
        channelList:[],//全渠道list
        serverMap:{},//全服务器ID：Name 映射Map
        platforMap:{},//过滤后的平台服务器idmap
    },
    getters: {
        
    },
    mutations: {
        setGame(state,gameName){
            state.gameName = gameName;
        },
        setGameList(state,list){
            state.gameList = list;
        },
        setPlatformList(state,list){
            state.completePlatform = list;
        },
        //Map
        setChannelMap(state,obj){
            state.channelMap = obj;
        },
        setChannelList(state,list){
            state.channelList = list;
        },
        setServerMap(state,obj){
            state.serverMap = obj;
        },
        setPlatforMap(state,obj){
            state.platforMap = obj;
        }
    },
    actions: {
        // handleGameList({ commit }, { name }){
        //     return Promise((resolve,reject)=>{

        //     })
        // }
    }
}
