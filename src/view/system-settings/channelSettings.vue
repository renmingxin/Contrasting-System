<template>
    <div class="pc-container">
        <div>
            <div>
                <span></span>
                <div>
                    <Button size="small" icon="md-add" type="info" @click="addDitch">新增</Button>
                    <Button size="small" icon="md-trash" type="error" @click="deleteDitch(checkedArr)">批量删除</Button>
                </div>
            </div>
            <Table  border :columns="columns" :data="ditchData"  @on-selection-change="onSelect"></Table>
            <Page class="page"  :total="ditchTotalSize" :current.sync="nowPage" :page-size="pageParams.size" @on-change="pageHandle"  show-elevator />
        </div>
        <Modal v-model="modalDataShow" :closable="false" :width="500" :height="1000" :mask-closable="false">
            <div  slot="header" style="font-weight: bold;">
                {{modalData.modalType ==='update'?'修改信息':'添加渠道'}}
            </div>
            <div class="form">
                <div>
                    <label for="">渠道ID</label>
                    <Input type="text" v-model="modalData.channelId" :disabled="modalData.modalType ==='update'?true:false" class="form-input"/>
                </div>
                <div>
                    <label for="">渠道名称</label>
                    <Input type="text" v-model="modalData.channelName" class="form-input"/>
                </div>
            </div>
            <div slot="footer">
                <Button type="warning" size="small" @click="closeModel">关闭</Button>
                <Button v-if="modalData.modalType ==='update'" type="info" size="small" @click="sureUpdateDitch" >
                    修改
                </Button>
                <Button v-if="modalData.modalType ==='add'" type="info" size="small" @click="sureaddDitch" >
                    新增
                </Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import bilist from './bilist.js'
    import { deleteDitch_axios } from '@/api/systemSettings'

    export default{
        data() {
            return {
                columns:[],
                ditchData:[],
                modalDataShow:false,
                modalData:{
                    modalType:'',
                    channelId:'',
                    channelName:'',
                },
                ditchTotalSize:0,
                checkedArr:[],
                nowPage:1,
                pageParams:{
                    page:1,
                    size:15
                },
            }
        },
        mixins:[bilist],
        beforeMount() {
        },
        mounted(){
            this.initTable();
            this.getDitchList();
        },
        watch:{
        },
        methods:{
            initTable(){
                this.columns = [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    { title: "渠道ID", key: "channelId" },
                    { title: "渠道名称", key: "channelName" },
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
                                        click: () => {
                                            this.checkDitchData(params.row);
                                        }
                                    }
                                },'修改'),
                                h(
                                    "Button",
                                    {
                                        props: { size: "small", icon: "md-trash", type:"error" },
                                        on: {
                                            click: () => {
                                                this.deleteDitch(params.row.channelId)
                                            }
                                        }
                                    },"删除")
                            ]);
                        }
                    }
                ]
            },
            addDitch(){
                this.modalData = {
                    modalType:'add',
                    ditchId:'',
                    ditchName:'',
                }
                this.modalDataShow = true;
            },
            closeModel(){
                this.modalDataShow = false;
                this.modalData = {};
            },
            onSelect(arr){
                let selectArr = [];
                for (const iterator of arr) {
                    selectArr.push(iterator.channelId)
                }
                this.checkedArr = selectArr;
            },

            deleteDitch(msg){
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
                        deleteDitch_axios(msgArr,data=>{
                            this.$Message.success(data.msg);
                            this.nowPage = 1;
                            this.pageParams.page = 1;
                            this.getDitchList();
                        });
                    }
                })
            },
            pageHandle(num){
                this.pageParams.page = num;
                this.getDitchList();
            },
        }
    }
</script>

<style lang="less" scoped>
    .pc-container {
        >div {
            margin-top: 40px;
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
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
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
    .form>div>label {
        display: block;
        text-align: center;
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
