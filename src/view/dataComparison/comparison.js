//得到对比数据的大类 和 手写大类与小类的关系
function getBigDataTypeList(){
    this.dataTypeList1 = [
        {
            title:'综合数据',
            son:[
                { value: 'completeContrast',label:'数据总览'},
                { value: 'completeLtv',label:'LTV统计'},
            ]
        },
        {
            title:'活跃数据',
            son:[
                { value: 'activeRealTime',label:'时时在线'},
                { value: 'activeDuration',label:'时长分析'},
                { value: 'activeLogin',label:'登录次数'},
            ]
        },
        {
            title:'留存数据',
            son:[
                { value: 'storageData',label:'留存总览'},
                { value: 'storageLess',label:'留存衰减'},
                { value: 'gameSteps',label:'游戏步骤数据'},
                { value: 'transcript',label:'副本通过率'},
                { value: 'transcriptDetails',label:'副本通过详情'},
                { value: 'storageLogin',label:'登录进度统计'},
            ]
        },
        {
            title:'付费数据',
            son:[
                { value: 'payBasics',label:'付费总览'},
                { value: 'rechargeDirect',label:'直购/非直购'},
                { value: 'rechargeMonth',label:'月付费数据'},
                { value: 'rechargeFirst',label:'首充数据'},
                { value: 'consumeUser',label:'消费用户数据'},
            ]
        },
        {
            title:'滚服数据',
            son:[
                { value: 'rollBasics',label:'滚服总览'},
            ]
        },
    ];
    this.dataTypeMap = {
        completeContrast:[
            { label:'总注册',value: 'allRegister'},
            { label:'新增注册',value: 'newRegister'},
            { label:'新增创建',value: 'newCreate'},
            { label:'新增创建率',value: 'newCreateRatio',ratio:true},
            { label:'最高在线',value: 'bestOnline'},
            { label:'平均在线',value: 'averageOnline'},
            { label:'日活跃数',value: 'activityDay'},
            { label:'钻石消耗',value: 'jewelExpend'},
            { label:'每日充值人数',value: 'chargePeople'},
            { label:'充值金额',value: 'chargeMoney'},
            { label:'新增充值人数',value: 'newChargePeople'},
            { label:'新增充值金额',value: 'newChargeMoney'},
            { label:'ARPU',value: 'arpu'},
            { label:'ARPPU',value: 'arppu'},
            { label:'付费率',value: 'payRatio',ratio:true},
            
        ],
        completeLtv:[
            { label:'LTV1',value: 'ltv1'},
            { label:'LTV2',value: 'ltv2'},
            { label:'LTV3',value: 'ltv3'},
            { label:'LTV4',value: 'lTV4'},
            { label:'LTV5',value: 'lTV5'},
            { label:'LTV6',value: 'lTV6'},
            { label:'LTV7',value: 'lTV7'},
            { label:'LTV15',value: 'lTV15'},
            { label:'LTV30',value: 'lTV30'},
            { label:'LTV60',value: 'lTV60'},
            { label:'LTV90',value: 'lTV90'},
            { label:'LTV120',value: 'lTV120'},
            { label:'LTV150',value: 'lTV150'},
            { label:'LTV180',value: 'lTV180'},
            { label:'LTV210',value: 'lTV210'},
            { label:'LTV240',value: 'lTV240'},
            { label:'LTV270',value: 'lTV270'},
            { label:'LTV300',value: 'lTV300'},
            { label:'LTV330',value: 'lTV330'},
            { label:'LTV360',value: 'lTV360'},
        ],
        activeDuration:[
            { value: 'm0',label:'0~5分钟' },
            { value: 'm1',label:'5~10分钟' },
            { value: 'm2',label:'10~15分钟' },
            { value: 'm3',label:'15~20分钟' },
            { value: 'm4',label:'20~25分钟' },
            { value: 'm5',label:'25~30分钟' },
            { value: 'm6',label:'30~35分钟' },
            { value: 'm7',label:'35~40分钟' },
            { value: 'm8',label:'40~45分钟' },
            { value: 'm9',label:'45~50分钟' },
            { value: 'm10',label:'50~55分钟' },
            { value: 'm11',label:'55~60分钟' },
            { value: 'h1',label:'1~2小时' },
            { value: 'h2',label:'2~3小时' },
            { value: 'h3',label:'3~4小时' },
            { value: 'h4',label:'4~5小时' },
            { value: 'h5',label:'5~6小时' },
            { value: 'h6',label:'6~7小时' },
            { value: 'h7',label:'7~8小时' },
            { value: 'h8',label:'8小时以上' },
            { value: 'timeMean',label:'平均在线时长(分)' },
        ],
        storageData:[
            { label:'次日登陆',value: 'rent2'},
            { label:'3日登陆',value: 'rent3'},
            { label:'4日登陆',value: 'rent4'},
            { label:'5日登陆',value: 'rent5'},
            { label:'6日登陆',value: 'rent6'},
            { label:'7日登陆',value: 'rent7'},
            { label:'15日登陆',value: 'rent15'},
            { label:'30日登陆',value: 'rent30'},
            { label:'60日登陆',value: 'rent60'},
            { label:'90日登陆',value: 'rent90'},
            { label:'120日登陆',value: 'rent120'},
            { label:'150日登陆',value: 'rent150'},
            { label:'180日登陆',value: 'rent180'},
            { label:'210日登陆',value: 'rent210'},
            { label:'240日登陆',value: 'rent240'},
            { label:'270日登陆',value: 'rent270'},
            { label:'300日登陆',value: 'rent300'},
            { label:'330日登陆',value: 'rent330'},
            { label:'360日登陆',value: 'rent360'},
        ],
        storageLess:[
            { label:'次日衰减',value: 'rent2Decay',ratio:true},
            { label:'3日衰减',value: 'rent3Decay',ratio:true},
            { label:'4日衰减',value: 'rent4Decay',ratio:true},
            { label:'5日衰减',value: 'rent5Decay',ratio:true},
            { label:'6日衰减',value: 'rent6Decay',ratio:true},
            { label:'7日衰减',value: 'rent7Decay',ratio:true},
            { label:'15日衰减',value: 'rent15Decay',ratio:true},
            { label:'30日衰减',value: 'rent30Decay',ratio:true},
            { label:'60日衰减',value: 'rent60Decay',ratio:true},
            { label:'90日衰减',value: 'rent90Decay',ratio:true},
            { label:'120日衰减',value: 'rent120Decay',ratio:true},
            { label:'150日衰减',value: 'rent150Decay',ratio:true},
            { label:'180日衰减',value: 'rent180Decay',ratio:true},
            { label:'210日衰减',value: 'rent210Decay',ratio:true},
            { label:'240日衰减',value: 'rent240Decay',ratio:true},
            { label:'270日衰减',value: 'rent270Decay',ratio:true},
            { label:'300日衰减',value: 'rent300Decay',ratio:true},
            { label:'330日衰减',value: 'rent330Decay',ratio:true},
            { label:'360日衰减',value: 'rent360Decay',ratio:true},
        ],
        rechargeUser:[
            { label:'VIP人数',value: 'chargeVipRoleNum'},
            { label:'VIP人数占比',value: 'vipNumRate',ratio:true},
            { label:'充值人数',value: 'chargeRoleNum'},
            { label:'充值人数占比',value: 'chargeRoleRate',ratio:true},
            { label:'充值金额',value: 'chargeMoney'},
            { label:'获得钻石',value: 'amount'},
            { label:'免费钻石获得',value: 'freeAmount'},
            { label:'充值钻石获得',value: 'payAmount'},
        ],
        consumeUser:[
            { label:'消费玩家数量',value: 'consumeRoleNum'},
            { label:'消费玩家消费总额',value: 'consumeAmount1'},
            { label:'免费钻石消耗',value: 'consumeFreeAmount1'},
            { label:'付费钻石消耗',value: 'consumePayAmount1'},
            { label:'总注册',value: 'totalRoleNum'},
            { label:'消费率',value: 'playerRate',ratio:true},
            { label:'所有消费总额',value: 'consumeAmount'},
            { label:'充值占比',value: 'rechargeRate',ratio:true},
            { label:'全部免费钻石',value: 'payFreeAmount'},
            { label:'免费钻石占比',value: 'payFreeAmountRate',ratio:true},
            { label:'全部付费钻石',value: 'payPayAount'},
            { label:'付费钻石占比',value: 'payJewelRate',ratio:true},
        ],
        consumeDetails:[
            { label:'消费总量',value: 'amount'},
            { label:'消费人数',value: 'roleNum'},
            { label:'人均消费量',value: 'perPeopel',ratio:true},
            { label:'免费钻石消费总量',value: 'freeAmount'},
            { label:'免费钻石消费人数',value: 'freeRoleNum'},
            { label:'免费钻石人均消费量',value: 'freeJewelPer',ratio:true},
            { label:'付费钻石消费总量',value: 'payAmount'},
            { label:'付费钻石消费人数',value: 'payRoleNum'},
            { label:'付费钻石人均消费量',value: 'payJewelPer',ratio:true},
        ],
        payJewel:[
            { label:'活跃人数',value: 'activeRoleNum'},
            { label:'获得钻石',value: 'ge'},
            { label:'消耗钻石',value: 'use'},
            { label:'玩家总存量',value: 'balance'},
            { label:'玩家人均存量',value: 'activePlayerPer'},
        ],
    }
}
//得到下拉框平台数据
function getPlatformList(data){
    let arr = [];
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            arr.push({
                label: key,
                value: key,
            })
        }
    }
    this.platformList = arr;
}

//封装render 每次只return一次render函数
function packageRender(h,params,selectServerColumns){
    let { key } = params.column;//当前列的key
    let data = params.row[key];//当前值列的值
    let lastData;
    if(this.$Tools.isInteger(data)){
        lastData = data;
    }else {
        lastData = Number(data.toFixed(2));
    }
    let flag = false;//false为当前列是最大值 true则不是
    let arr = [];
    for (const item of selectServerColumns) {
        let itemData = params.row[item];
        let formatData;
        if(this.$Tools.isInteger(itemData)){
            formatData = itemData;
        }else {
            formatData = Number(itemData.toFixed(2));
        }
        arr.push(formatData);
        if( formatData > lastData ){
            flag = true;
            break;
        }
    }
    let equalFlag = this.$Tools.isAllEqual(arr);
    return h('div',{
        style:{
            background: !flag && this.bestButton &&!equalFlag ? '#187' : '#fff',
            color: !flag && this.bestButton && !equalFlag ? '#fff' : '#000',
        }
    }, this.sureRatio ? lastData + '%' : lastData)
}
//得到字段是否为百分比的map
function formatFieldRatio(){
    let obj = {};
    for (const faKey in this.dataTypeMap) {
        for (const sonItm of this.dataTypeMap[faKey]) {
            obj[sonItm.value] = sonItm.ratio?sonItm.ratio:false
        }
    }
    this.ratioMap = obj;
}

export default {
    methods: {
        getBigDataTypeList,
        getPlatformList,
        packageRender,
        formatFieldRatio
    }
}