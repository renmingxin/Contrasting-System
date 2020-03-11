<template>
    <div>
        <Button size="small" icon="md-add" type="info"  @click="appendParentNode">添加主类别</Button>
        <Tree :data="treeData" :render="renderContent" class="demo-tree-render"></Tree>
        <Modal v-model="nodeModal.show" :closable="false" :width="300" :height="1000" :mask-closable="false">
            <div slot="header" style="font-weight: bold;">
                {{nodeModal.modalType ==='update'?'修改信息':'添加节点'}}
            </div>
            <div class="form-server">
                <div>
                    <label style="margin-right: 10px" for="">节点名</label>
                    <Input type="text" v-model="nodeModal.nodeName"  class="form-input"/>
                </div>
            </div>
            <div slot="footer">
                <Button type="warning" size="small" @click="closeModel">关闭</Button>
                <Button v-if="nodeModal.modalType ==='update'" type="info" size="small"
                        @click="handleNode('update')">
                    修改
                </Button>
                <Button v-if="nodeModal.modalType ==='add'" type="info" size="small" @click="handleNode('add')">
                    新增
                </Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {getGameCategory_axios,addGameCategory_axios,deleteGameCategory_axios,updateGameCategory_axios} from '@/api/systemSettings'

    export default {
        name: "gameCategoryDeploy",
        data(){
            return {
                nodeModal: {
                    show: false,
                    modalType: 'add',
                    nodeName: '',

                },
                treeData: [
                    {
                        title: 'child 1-1',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-1-1',
                                expand: true
                            },
                            {
                                title: 'leaf 1-1-2',
                                expand: true
                            }
                        ]
                    },
                    {
                        title: 'child 1-2',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-2-1',
                                expand: true
                            },
                            {
                                title: 'leaf 1-2-1',
                                expand: true
                            }
                        ]
                    }
                ],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                }
            }
        },
        mounted(){
            this.getGameCategory();
        },
        methods: {
            renderContent(h, {root, node, data}){
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '180px',
                    }
                }, [
                    h('span', [
                        h('span',{
                            style:{
                                display:'inline-block',
                                minWidth:'35px',
                                lineHeight:'24px',
                            }
                        }, data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: data.parent ? '19px' : '0px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                // type:'info',
                                // icon:'md-add'
                            }),
                            style: {
                                marginRight: '8px',
                                display: data.parent ? 'none' : 'inline-block'
                            },
                            on: {
                                click: () => {
                                    this.appendNode(data)
                                }
                            }
                        },'添加'),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                // type:'info',
                                // icon:'md-add'
                            }),
                            style: {
                                marginRight: '8px',
                            },
                            on: {
                                click: () => {
                                    this.modifyNode(data)
                                }
                            }
                        },'修改'),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                // icon: 'md-trash',
                                // type:'error'
                            }),
                            on: {
                                click: () => {
                                    let {id,name} = data;
                                    this.removeNode(id,name)
                                }
                            }
                        },'删除')
                    ])
                ]);
            },
            getGameCategory(){
                getGameCategory_axios({}, data => {
                    data.obj.forEach(ele=>{
                        this.formatTreeData(ele)
                    });
                    this.treeData = data.obj;
                    console.log(this.treeData)
                })
            },
            formatTreeData(data){
                data.title = data.name;
                data.expand = true;
                if(data.children && Array.isArray(data.children) && data.children.length >0){
                    data.children.forEach(ele=>{
                        this.formatTreeData(ele);
                    })
                }
                return data;
            },
            appendParentNode(){
                this.nodeModal = {
                    show:true,
                    modalType:'add',
                    nodeName:'',
                    parent:null,
                    children:[]
                }
            },
            appendNode(data){
                this.nodeModal = {
                    show:true,
                    modalType:'add',
                    nodeName:'',
                    parent:data.id,
                    children:[]
                }
            },
            modifyNode(data){
                let { id,name,parent,children } = data;
                this.nodeModal = {
                    show:true,
                    modalType:'update',
                    id:id,
                    nodeName:name,
                    parent:parent,
                    children:children
                }
            },
            removeNode(id,name){
                this.$Modal.warning({
                    title:'警告',
                    content:`确认要删除${name}类别吗？`,
                    onOk: ()=>{
                        deleteGameCategory_axios(id,data=>{
                            this.$Message.success(data.msg);
                            this.getGameCategory();
                        });
                    }
                })
            },
            handleNode(type){
                if (type === 'add') {
                    let params ={
                        name:this.nodeModal.nodeName,
                        parent:this.nodeModal.parent || null,
                        children:this.nodeModal.children || [],
                    };
                    addGameCategory_axios(params,data=>{
                        this.$Message.success(data.msg);
                        this.getGameCategory();
                        this.nodeModal.show = false;
                    })
                }else {
                    let params ={
                        id:this.nodeModal.id,
                        name:this.nodeModal.nodeName,
                        parent:this.nodeModal.parent || null,
                        children:this.nodeModal.children || [],
                    };
                    updateGameCategory_axios(params,data=>{
                        this.$Message.success(data.msg);
                        this.getGameCategory();
                        this.nodeModal.show = false;
                    })
                }
            },
            closeModel(){
                this.nodeModal.show = false;
            }
        }
    }
</script>

<style scoped lang="less">
    .demo-tree-render .ivu-tree-title {
        width: 100%;
    }
    .form-server{
        >div{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            >label{
                width: 40px;
                /*text-align: right;*/
            }
            .form-input{
                width: 200px;
            }
        }
    }
</style>