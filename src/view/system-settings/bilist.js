import {
    getGameData_axios,
    getGameCategory_axios,
    sureaddGame_axios,
    sureUpdateGame_axios,
    deleteGame_axios,
    sureaddServer_axios,
    sureUpdateServer_axios,
    sureaddPlatform_axios,
    getDitchList_axios,
    sureaddDitch_axios,
    sureUpdateDitch_axios
} from '@/api/systemSettings'
import { formatHMSDate } from '@/libs/tools'


function getGameData(){
    getGameData_axios({},data=>{
        console.log(data);
        this.gameData = data.obj;
    })
}

function getGameCategory(){
    getGameCategory_axios({},data=>{
        let cascaderList = [];
        data.obj.forEach(ele=>{
            let childrenArr = [];
            if(ele.children && Array.isArray(ele.children)){
                ele.children.forEach(item=>{
                    childrenArr.push({
                        value:item.id,
                        label:item.name,
                    })
                })
            }
            cascaderList.push({
                value:ele.id,
                label:ele.name,
                children:childrenArr
            })
        });
        this.gameCascaderList = cascaderList;
    })
}

function addGame(){
    this.modalData = {
        modalType:'add',
        gameCode:'',
        gameName:'',
        gameCategory:[],
    };
    this.modalDataShow = true;
}

function checkGameData(params){
    let gameCategory = [];
    if(params.gameCategory){
        gameCategory = [params.gameCategory.parent,params.gameCategory.id];
    }
    this.modalData = {
        modalType:'update',
        gameCode:params.gameCode,
        gameName:params.gameName,
        gameCategory,
    };
    console.log(this.modalData);
    this.modalDataShow = true;
}

function sureaddGame(){
    let params = {
        gameCode:this.modalData.gameCode,
        gameName:this.modalData.gameName,
        categoryId:this.modalData.gameCategory[1]
    };
    sureaddGame_axios(params,data=>{
        this.$Message.success(data.msg);
        this.getGameData();
        this.getAllGame();
        this.modalDataShow = false;
    });
}

function sureUpdateGame(){
    let params = {
        gameCode:this.modalData.gameCode,
        gameName:this.modalData.gameName,
        categoryId:this.modalData.gameCategory[1]
    };
    sureUpdateGame_axios(params,data=>{
        this.$Message.success(data.msg);
        this.getGameData();
        this.getAllGame();
        this.modalDataShow = false;
    });
}

function deleteGame(code,title){
    this.$Modal.warning({
        title:'警告',
        content:`确认要删除【${title}】游戏吗？`,
        onOk: ()=>{
            deleteGame_axios(code,data=>{
                this.$Message.success(data.msg);
                this.getGameData();
                this.getAllGame();
            });
        }
    })
}

function addServer(){
    this.modalData1 = {
        modalType:'add',
        gameCode:this.clickGameCode,
        serverId:'',
        serverName:'',
        serverDate:'',
        platformName:'',
    }
    this.modalDataShow1 = true;
}

function checkServerData(params){
    this.modalData1 = {
        modalType:'update',
        gameCode:this.clickGameCode,
        serverId:params.serverId,
        serverName:params.serverName,
        platformName:params.platformName,
        serverDate:params.serverStartTime,
    }
    this.modalDataShow1 = true;
}

function sureaddServer(){
    let params = {
        gameCode:this.modalData1.gameCode,
        serverId:this.modalData1.serverId,
        serverName:this.modalData1.serverName,
        platformName:this.modalData1.platformName,
        serverStartTime:formatHMSDate(this.modalData1.serverDate),
    };
    sureaddServer_axios(params,data=>{
        this.$Message.success(data.msg);
        this.getClickServerList(this.clickGameCode);
        this.getAllGame();
        this.modalDataShow1 = false;
    });
}

function sureUpdateServer(){
    let serverStartTime;
    if (Object.prototype.toString.call(this.modalData1.serverDate) === '[object Date]'){
        serverStartTime = formatHMSDate(this.modalData1.serverDate);
    }else{
        serverStartTime = this.modalData1.serverDate;
    }
    let params = {
        gameCode:this.clickGameCode,
        serverId:this.modalData1.serverId,
        serverName:this.modalData1.serverName,
        platformName:this.modalData1.platformName,
        serverStartTime
    };
    sureUpdateServer_axios(params,data=>{
        this.$Message.success(data.msg);
        this.getClickServerList(this.clickGameCode);
        this.modalDataShow1 = false;
    });
}

//新增平台
function addPlatform(){
    this.modalData2= {
        modalType:'add',
        gameCode:this.clickGameCode,
        platformName:'',
        describe:'',
    };
    this.modalDataShow2 = true;
}

function sureaddPlatform(){
    let params ={
        gameCode:this.modalData2.gameCode,
        platformName:this.modalData2.platformName,
        describe:this.modalData2.describe,
    };
    sureaddPlatform_axios(this.clickGameCode,params,data=>{
        this.$Message.success(data.msg);
        this.getClickPlatformList(this.clickGameCode);
        this.getAllGame();
        this.modalDataShow2 = false;
    });
}

//得到渠道列表
function getDitchList(){
    getDitchList_axios(this.pageParams,data=>{
        this.ditchData = data.obj.list;
        this.ditchTotalSize = data.obj.total;
    })
}

function sureaddDitch(){
    let params = {
        channelId:this.modalData.channelId,
        channelName:this.modalData.channelName,
    };
    sureaddDitch_axios(params,data=>{
        this.$Message.success(data.msg);
        this.getDitchList();
        this.modalDataShow = false;
    });
}

function checkDitchData(params){
    this.modalData = {
        modalType:'update',
        channelId:params.channelId,
        channelName:params.channelName,
    }
    this.modalDataShow = true;
}

function sureUpdateDitch(){
    let params = {
        channelId:this.modalData.channelId,
        channelName:this.modalData.channelName,
    };
    sureUpdateDitch_axios(params,data=>{
        this.$Message.success(data.msg);
        this.getDitchList();
        this.modalDataShow = false;
    });
}


//查询所有渠道下拉框
function getAllDitched(){
    let callback = {
        onOk: (data) => {
            data = data.data;
            if(data.code === 200){
                let arr = [];
                for (const iterator of data.obj) {
                    arr.push({
                        value:iterator.channelId,
                        label:iterator.channelName
                    })
                }
                this.$store.commit('setChannelList',arr);
            }
        },
        onError: (error)=>{
            console.log(error);
        }
    }
    let msg = {};
    // this.$Http.get('/config/game/channel/all',msg,callback);
}
//查询所有游戏下拉框
function getAllGame(){
    let callback = {
        onOk: (data) => {
            data = data.data;
            if(data.code === 200){
                let arr = [];
                for (const iterator of data.obj) {
                    arr.push({
                        value:iterator.gameCode,
                        label:iterator.gameName
                    })
                }
                this.$store.commit('setGameList',arr);
            }
        },
        onError: (error)=>{
            console.log(error);
        }
    }
    let msg = {};
    // this.$Http.get('/config/game/code',msg,callback);
}






function updateChannel(){
    let channel = this.targetKeys.join(',');
    let { gameCode, serverId, serverName, platformName, serverDate } = this.modalData3;
    let callback = {
        onOk: (data) => {
            data = data.data;
            if(data.code === 200){
                this.$Message.success(data.msg);
                this.getClickServerList(this.clickGameCode);
                this.modalDataShow3 = false;
            }else {
                this.$Message.error(data.msg)
            }
        },
        onError: (error)=>{
            this.$Message.error(data.msg)
        }
    }
    let msg = {
        gameCode,
        serverId,
        serverName,
        channel,
        platformName,
        serverStartTime:serverDate
    };
    console.log(msg);
    // this.$Http.post('/config/game/server/update',msg,callback);
}
export default {
    methods: {
        getGameData,
        getGameCategory,
        addGame,
        addServer,
        addPlatform,
        sureaddServer,
        sureaddPlatform,
        checkGameData,
        sureaddGame,
        sureUpdateGame,
        deleteGame,
        getDitchList,
        sureUpdateDitch,
        sureaddDitch,
        checkDitchData,
        getAllGame,
        getAllDitched,
        checkServerData,
        sureUpdateServer,
        updateChannel,
    }
}