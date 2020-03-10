<template>
    <div class="pc-container">
        <div>
            <div>
                <span>游戏一览</span>
                <Button size="small" icon="md-add" type="info" @click="addGame">新增</Button>
            </div>
            <Table max-height="280" border :columns="columns" :data="gameData" @on-row-click="clickGameRow" highlight-row></Table>
        </div>
        <Tabs style="margin-top: 30px;" value="notMergePage" >
            <TabPane label="服务器" name="notMergePage">
                <div v-show="!serverAddBtn">
                    <h2>请单击选择上方，选择查看的游戏</h2>
                </div>
                <div v-show="serverAddBtn" class="MergePage" >
                    <div>
                        <div>
                            <Button size="small" icon="md-add" type="info" @click="addServer">新增</Button>
                            <Button size="small" icon="md-trash" type="error" @click="deleteServer(checkedArr)">批量删除</Button>
                        </div>
                    </div>
                    <Table ref="selection" border :columns="columns2" :data="serverData" @on-selection-change="onSelect"></Table>
                    <Page class="page"  :total="serverTotalSize" :current.sync="nowPage" :page-size="pageServerParams.size" @on-change="pageHandle"  show-elevator />
                </div>
            </TabPane>

            <TabPane label="平台一览" name="platformPage">
                <div class="MergePage" >
                    <div>
                        <div>
                            <Button size="small" icon="md-add" type="info" @click="addPlatform">新增</Button>
                        </div>
                    </div>
                    <Table ref="selection" border :columns="columns4" :data="platformData"></Table>
                </div>
            </TabPane>
        </Tabs>
        <Modal v-model="modalDataShow" :closable="false" :width="500" :height="1000" :mask-closable="false">
            <div  slot="header" style="font-weight: bold;">
                {{modalData.modalType ==='update'?'修改信息':'添加游戏'}}
            </div>
            <div class="form">
                <div>
                    <label for="">游戏Code</label>
                    <Input type="text" v-model="modalData.gameCode" :disabled="modalData.modalType ==='update'?true:false" class="form-input"/>
                </div>
                <div>
                    <label for="">游戏名称</label>
                    <Input type="text" v-model="modalData.gameName" class="form-input"/>
                </div>
                <div>
                    <label for="">游戏类别</label>
                    <Cascader class="form-input" :data="gameCascaderList" v-model="modalData.gameCategory" @on-change="changeCascader" ></Cascader>
                </div>
            </div>
            <div slot="footer">
                <Button type="warning" size="small" @click="closeModel">关闭</Button>
                <Button v-if="modalData.modalType ==='update'" type="info" size="small" @click="sureUpdateGame" >
                    修改
                </Button>
                <Button v-if="modalData.modalType ==='add'" type="info" size="small" @click="sureaddGame" >
                    新增
                </Button>
            </div>
        </Modal>
        <Modal v-model="modalDataShow1" :closable="false" :width="500" :height="1000" :mask-closable="false">
            <div slot="header" style="font-weight: bold;">
                {{modalData1.modalType ==='update'?'修改信息':'添加服务器'}}
            </div>
            <div class="form-server">
                <div class="form-server-div">
                    <div>
                        <span for="">游戏Code</span>
                        <Input type="text" v-model="modalData1.gameCode" :disabled="true" class="form-input"/>
                    </div>
                    <div>
                        <span for="">服务器ID</span>
                        <Input type="text" v-model="modalData1.serverId" :disabled="modalData1.modalType ==='update'?true:false" class="form-input"/>
                    </div>
                    <div>
                        <span for="">服务器名</span>
                        <Input type="text" v-model="modalData1.serverName" class="form-input"/>
                    </div>
                    <div style="margin-bottom:10px">
                        <span for="">所选平台</span>
                        <div>
                            <Select v-model="modalData1.platformName"  placeholder="服务器选择">
                                <Option v-for="item in selectedPlatform" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <span for="">开服时间</span>
                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" v-model="modalData1.serverDate" placeholder="请选择开服时间"  style="width: 200px"></DatePicker>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button type="warning" size="small" @click="closeModel">关闭</Button>
                <Button v-if="modalData1.modalType ==='update'" type="info" size="small" @click="sureUpdateServer" >
                    修改
                </Button>
                <Button v-if="modalData1.modalType ==='add'" type="info" size="small" @click="sureaddServer" >
                    新增
                </Button>
            </div>
        </Modal>
        <Modal v-model="modalDataShow2" :closable="false" :width="500" :height="1000" :mask-closable="false">
            <div slot="header" style="font-weight: bold;">
                {{modalData2.modalType ==='update'?'修改信息':'添加平台'}}
            </div>
            <div class="form-server">
                <div>
                    <label style="margin-right: 10px" for="">游戏Code</label>
                    <Input type="text" v-model="modalData2.gameCode" :disabled="true" class="form-input"/>
                </div>
                <div>
                    <label style="margin-right: 10px" for="">平台名称</label>
                    <Input type="text" v-model="modalData2.platformName" :disabled="modalData2.modalType ==='update'?true:false" class="form-input"/>
                </div>
                <div>
                    <label style="margin-right: 10px" for="">平台描述</label>
                    <Input type="text" v-model="modalData2.describe" class="form-input"/>
                </div>
            </div>
            <div slot="footer">
                <Button type="warning" size="small" @click="closeModel">关闭</Button>
                <!-- <Button v-if="modalData2.modalType ==='update'" type="info" size="small" @click="sureUpdateServer" >
                    修改
                </Button> -->
                <Button v-if="modalData2.modalType ==='add'" type="info" size="small" @click="sureaddPlatform" >
                    新增
                </Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { getGameServerList_axios, getPlatformList_axios,deleteServer_axios,deletePlatform_axios } from '@/api/systemSettings'
    import bilist from './bilist.js'
    export default{
        data() {
            return {
                columns:[],
                columns2:[],
                columns3:[],
                columns4:[],
                gameData:[],
                serverData:[],
                platformData:[],
                modalDataShow:false,
                modalDataShow1:false,
                modalDataShow2:false,
                serverAddBtn:false,
                clickGameCode:'',

                selectedPlatform:[],//平台下拉框

                transferData:[],

                modalData:{
                    modalType:'',
                    gameCode:'',
                    gameName:'',
                    gameCategory:[],
                },
                modalData1:{
                    modalType:'',
                    gameCode:'',
                    serverId:'',
                    serverName:'',
                    serverDate:'',
                    platformName:'',
                },
                modalData2:{
                    modalType:'',
                    gameCode:'',
                    platformName:'',
                    describe:'',
                },
                checkedArr:[],
                serverTotalSize:0,
                nowPage:1,
                pageServerParams:{
                    page:1,
                    size:10
                },
                gameCascaderList:[],
            }
        },
        mixins:[bilist],
        beforeMount() {
        },
        mounted(){
            this.initTable();
            this.getGameData();
            this.getGameCategory();
        },
        methods:{
            initTable(){
                this.columns = [
                    { title: "游戏码", key: "gameCode" ,width:100},
                    { title: "游戏名称", key: "gameName" },
                    {
                        title: "游戏类别", key: "gameClass",
                        render:(h, params) => {
                            return h('div',{},params.row.gameCategory.name || '')
                        }
                    },
                    {
                        title: "操作",
                        key: "$handle",
                        width:300,
                        render: (h, params) => {
                            return h("div", [
                                h('Button', {
                                    props: {size: 'small', icon: "ios-pricetag",type:'info'},
                                    style: {marginRight: '5px'},
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation();
                                            this.checkGameData(params.row);
                                        }
                                    }
                                },'修改'),
                                h(
                                    "Button",
                                    {
                                        props: { size: "small", icon: "md-trash", type:"error" },
                                        on: {
                                            click: (e) => {
                                                e.stopPropagation();
                                                let title = params.row.gameName
                                                this.deleteGame(params.row.gameCode,title)
                                            }
                                        }
                                    },"删除")
                            ]);
                        }
                    }
                ]
                this.columns2 = [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    { title: "平台名称", key: "platformName" },
                    { title: "服务器ID", key: "serverId" },
                    { title: "服务器名", key: "serverName" },
                    // {
                    //     title: "渠道", key: "channel",
                    //     render:(h,params)=>{
                    //         return h('Button',{
                    //             props:{
                    //                 size:'small'
                    //             },
                    //             on:{
                    //                 click:()=>{
                    //                     this.changeChannel(params.row)
                    //                 }
                    //             }
                    //         },'分配渠道')
                    //     }
                    // },
                    { title: "开服时间", key: "serverStartTime" },
                    {
                        title: "操作",
                        key: "$handle",
                        render: (h, params) => {
                            return h("div", [
                                // h('Button', {
                                //     props: {size: 'small', icon: "ios-pricetag",type:'info'},
                                //     style: {marginRight: '5px'},
                                //     on: {
                                //         click: () => {
                                //             this.changeChannel(params.row)
                                //         }
                                //     }
                                // },'分配渠道'),
                                h('Button', {
                                    props: {size: 'small', icon: "ios-pricetag",type:'info'},
                                    style: {marginRight: '5px'},
                                    on: {
                                        click: () => {
                                            this.checkServerData(params.row)
                                        }
                                    }
                                },'修改'),
                                h("Button",{
                                    props: { size: "small", icon: "md-trash", type:"error" },
                                    on: {
                                        click: () => {
                                            this.deleteServer(params.row.serverId)
                                        }
                                    }
                                },"删除")
                            ]);
                        }
                    }
                ];
                this.columns3 = [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    { title: "平台名称", key: "platformName" },
                    { title: "服务器ID", key: "serverId" },
                    { title: "服务器名", key: "serverName" },
                    { title: "开服时间", key: "serverStartTime" },
                    {
                        title: "操作",
                        key: "$handle",
                        render: (h, params) => {
                            return h("div", [
                                h("Button",{
                                    props: { size: "small", icon: "md-trash", type:"error" },
                                    on: {
                                        click: () => {
                                            this.deleteServer(params.row.serverId)
                                        }
                                    }
                                },"删除")
                            ]);
                        }
                    }
                ];
                this.columns4 = [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    { title: "平台名称", key: "platformName" },
                    {
                        title: "描述", key: "describe",
                        render:(h,params)=>{
                            let data = params.row.describe
                            return h('div',{},data || '无描述');
                        }
                    },
                    {
                        title: "操作",
                        key: "$handle",
                        render: (h, params) => {
                            return h("div", [
                                // h('Button', {
                                //         props: {size: 'small', icon: "ios-pricetag",type:'info'},
                                //         style: {marginRight: '5px'},
                                //         on: {
                                //             click: () => {
                                //                 this.checkPlatform(params.row);
                                //             }
                                //         }
                                //     },'修改'),
                                h("Button",{
                                    props: { size: "small", icon: "md-trash", type:"error" },
                                    on: {
                                        click: () => {
                                            this.deletePlatform(params.row.platformName);
                                        }
                                    }
                                },"删除")
                            ]);
                        }
                    }
                ];
            },
            changeCascader(value,selectedData){
                console.log(value,selectedData)
            },
            clickGameRow(v){
                let code = v.gameCode;
                this.clickGameCode = code;
                //服务器列表
                this.getClickServerList(code);
                //得到平台列表
                this.getClickPlatformList(code);
            },
            getClickServerList(code){
                let msg = this.pageServerParams;
                let params = {
                    gameCode:code,
                };
                Object.assign(msg,params);
                getGameServerList_axios(msg,data=>{
                    this.serverAddBtn = true;
                    let arr = [];
                    for (const iterator of data.obj.list) {
                        arr.push({
                            key:iterator.serverId,
                            label:iterator.serverName,
                            disabled:iterator.merge
                        })
                    }
                    this.transferData = arr;
                    this.serverData = data.obj.list;
                    this.serverTotalSize = data.obj.total;
                })
            },
            getClickPlatformList(code){
                getPlatformList_axios(code,data=>{
                    let arr = [];
                    data.obj.forEach(item=>{
                        arr.push({
                            label:item.platformName,
                            value:item.platformName,
                        })
                    });
                    this.selectedPlatform = arr;
                    this.platformData = data.obj;
                });
            },
            closeModel(){
                this.modalDataShow = false;
                this.modalDataShow1 = false;
                this.modalDataShow2 = false;
                this.modalData = {};
                this.modalData1 = {};
            },
            onSelect(arr){
                let selectArr = [];
                for (const iterator of arr) {
                    selectArr.push(iterator.serverId)
                }
                this.checkedArr = selectArr;
            },
            deleteServer(msg){
                console.log(msg);
                let msgArr = [];
                if(Array.isArray(msg)){
                    msgArr = msg;
                }else {
                    msgArr.push(msg);
                }
                this.$Modal.warning({
                    title:'警告',
                    content:"确认要删除吗？",
                    onOk: ()=>{
                        deleteServer_axios(this.clickGameCode,msgArr,data=>{
                            console.log(data);
                            this.$Message.success(data.msg);
                            this.nowPage = 1;
                            this.getClickServerList(this.clickGameCode);
                        });
                    }
                })
            },
            deletePlatform(name){
                this.$Modal.warning({
                    title:'警告',
                    content:"确认要删除吗？",
                    onOk: ()=>{
                        let params = {
                            gameCode:this.clickGameCode,
                            platformName:name
                        };
                        deletePlatform_axios(this.clickGameCode,params,data=>{
                            this.$Message.success(data.msg);
                            this.getClickPlatformList(this.clickGameCode);
                        });
                    }
                })
            },
            pageHandle(num){
                this.pageServerParams.page = num;
                this.getClickServerList(this.clickGameCode);
            },

        }
    }
</script>

<style lang="less" scoped>
    .pc-container {
        >div {
            /*margin-top: 40px;*/
            >div {
                display: flex;
                flex-direction: row;
                align-items:center;
                justify-content: space-between;
                >span{
                    font-size:16px;
                    font-weight: bold;
                }
            }
        }
    }
    .MergePage {
        >div {
            display: flex;
            flex-direction:row-reverse;
            align-items:center;
            justify-content: space-between;
        }
    }
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        >div{
            display: flex;
            flex-direction: row;
            >label{
                line-height: 32px;
                margin-right: 10px;
            }
        }
        &-bottom{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            >div:nth-child(1){
                margin-right: 50px;
            }
            label{
                display:inline-block;
                width: 80px;
                text-align: right;
                padding-right: 10px;
            }
        }
    }
    .form-server {
        display: flex;
        flex-direction: column;
        align-items: center;
        &-div{
            >div {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                >span {
                    // border:1px solid red;
                    flex:0 0 60px;
                }
            }
        }
        &-bottom{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            >div:nth-child(1){
                margin-right: 50px;
            }
            label{
                display:inline-block;
                width: 80px;
                text-align: right;
                padding-right: 10px;
            }
        }
    }
    .form-input {
        width: 200px;
        margin-bottom: 10px;
    }
    .form-textarea {
        width: 300px;
        margin-bottom: 10px;
    }
    .page {
        margin: 10px 0 0 40%;
    }
</style>
