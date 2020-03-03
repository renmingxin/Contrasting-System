<template>
    <div class="pc-container">
        <div class="form-container">
            <!-- <span class="iconfont iconduibi"></span> -->
            <div class="form-game">
                <div v-for="(v,k) in gameQuery" :key="k">
                    <div v-if="v.enabled" class="game-container">
                        <div class="close" @click="closeEnable(v,k)">×</div>
                        <img :src="v.img" alt />
                        <div>{{v.name}}</div>
                        <Select v-model="v.platform" placeholder="请选择平台" style="width:150px">
                            <Option
                                v-for="item in platformList"
                                :value="item.value"
                                :key="item.value"
                            >{{ item.label }}</Option>
                        </Select>
                        <Select v-model="v.server" placeholder="请选择服务器" style="width:150px">
                            <Option
                                v-for="item in serverList"
                                :value="item.value"
                                :key="item.value"
                            >{{ item.label }}</Option>
                        </Select>
                        <DatePicker
                            v-show="!v.openServerDate"
                            v-model="v.onlyDate"
                            type="date"
                            placeholder="Select date"
                            style="width: 150px"
                        ></DatePicker>
                        <div>
                            <span style="margin-right:5px">是否为开服时间</span>
                            <i-switch v-model="v.openServerDate">
                                <span slot="open">开</span>
                                <span slot="close">关</span>
                            </i-switch>
                        </div>
                    </div>
                    <div v-else class="game-container-blank">
                        <div class="blank-game">无</div>
                        <Select
                            clearable
                            v-model="selectedAddGame"
                            placeholder="选择要添加的游戏"
                            @on-change="addQueryGame(v,k)"
                            style="width:150px"
                        >
                            <Option
                                v-for="item in gameSelect"
                                :value="item.value"
                                :key="item.value"
                            >{{ item.label }}</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div class="form-query">
                <!-- <span style="display: inline-block;vertical-align: -3px;margin-right:15px">选择对比数据</span> -->
                <Select v-model="ui.dataType1" style="width:220px" placeholder="请选择需要对比的数据">
                    <OptionGroup
                        v-for="(item, index) in dataTypeList1"
                        :label="item.title"
                        :key="index"
                    >
                        <Option
                            v-for="(sonItem, sonIndex) in item.son"
                            :value="sonItem.value"
                            :key="sonIndex"
                        >{{sonItem.label}}</Option>
                    </OptionGroup>
                </Select>
            </div>
            <div class="sure-btn">
                <Button type="info" style="width:220px" @click="handleComparison">开始对比</Button>
            </div>
        </div>
        <div class="table-container">
            <div class="best-button">
                <span style="margin-right:5px">标出最优项</span>
                <i-switch v-model="bestButton">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </i-switch>
            </div>
            <Table
                border
                :max-height="550"
                :columns="tableColumns"
                :data="tableData"
                :loading="loading"
            ></Table>
        </div>
    </div>
</template>

<script>
import comparison from './comparison'
export default {
  mixins: [comparison],
  data () {
    return {
      loading: false,
      ui: {
        serverName: '',
        startOpenServerDate: 0,
        endOpenServerDate: 6
      },
      form: {},
      bestButton: false,
      dataTypeMap: {},
      ratioMap: {},
      isRatio: false, // 此字段是否为百分比
      sureRatio: false,
      dataTypeList1: [],
      dataTypeList2: [],
      platformList: [
        { label: 'android', value: 'android' },
        { label: 'ios', value: 'ios' }
      ],
      serverList: [],
      dateChangeBtn: 'moreDate',
      dateInterval: {},
      selectServer: [], // 自定义列名
      tableColumns: [],
      tableData: [],

      gameQuery: {
        NO1: {
          enabled: false,
          img: '',
          name: '',
          platform: '',
          server: '',
          onlyDate: '',
          openServerDate: false
        },
        NO2: {
          enabled: false,
          img: '',
          name: '',
          platform: '',
          server: '',
          onlyDate: '',
          openServerDate: false
        },
        NO3: {
          enabled: false,
          img: '',
          name: '',
          platform: '',
          server: '',
          onlyDate: '',
          openServerDate: false
        },
        NO4: {
          enabled: false,
          img: '',
          name: '',
          platform: '',
          server: '',
          onlyDate: '',
          openServerDate: false
        }
      },
      gameMap: {
        sgz2017: {
          name: '三国志2017',
          img:
                        'http://img5.imgtn.bdimg.com/it/u=323911687,3601163338&fm=11&gp=0.jpg'
        },
        sgz2018: {
          name: '三国志2018',
          img:
                        'http://img0.imgtn.bdimg.com/it/u=3774367349,2232640289&fm=26&gp=0.jpg'
        },
        sgz2019: {
          name: '三国志2019',
          img:
                        'http://img4.imgtn.bdimg.com/it/u=3496863004,1494148810&fm=26&gp=0.jpg'
        },
        sgz2020: {
          name: '三国志2020',
          img:
                        'http://img1.imgtn.bdimg.com/it/u=3083515639,1939564822&fm=26&gp=0.jpg'
        }
      },
      gameSelect: [
        { label: '三国志2017', value: 'sgz2017' },
        { label: '三国志2018', value: 'sgz2018' },
        { label: '三国志2019', value: 'sgz2019' },
        { label: '三国志2020', value: 'sgz2020' }
      ],
      filterGameSelect: [],
      selectedAddGame: ''
    }
  },
  watch: {
    selectedAddGame (v) {}
  },
  computed: {

  },
  created () {
    this.getBigDataTypeList()
  },
  mounted () {

  },
  methods: {
    handleComparison () {
      console.log(this.gameQuery)
    },
    addQueryGame (v, k) {
      this.gameSelect.forEach((ele, index) => {
        if (this.selectedAddGame === ele.value) {
          this.gameSelect.splice(index, 1)
        }
      })
      console.log(this.selectedAddGame, v, k)
      v.enabled = true
      v.img = this.gameMap[this.selectedAddGame].img
      v.name = this.selectedAddGame
      v.platform = null
      v.server = ''
      v.onlyDate = ''
      v.openServerDate = false
    },
    // enabledQueryByGame(v,k){
    //     console.log(v,k)
    //     v.enabled = true;
    // }
    closeEnable (v, k) {
      console.log(v, k)
      this.gameSelect.push({ value: v.name, label: this.gameMap[v.name].name })
      this.selectedAddGame = ''
      v.enabled = false
    }
  }
}
</script>

<style lang="less" scoped>
.border {
    border: 1px solid #ff0000;
}
.form-container {
    margin-bottom: 30px;
    .form-query {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center
    }
    .form-game {
        // border:1px solid red;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 350px;
        padding: 0 150px;
        > div {
            width: 22%;
            height: 100%;
            // border:1px solid red;
            display: flex;
            justify-content: center;
            .game-container {
                width: 50%;
                border: 1px solid red;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                padding: 20px 0;
                position: relative;
                > img {
                    width: 125px;
                    height: 125px;
                }
                .close {
                    position: absolute;
                    top: -5px;
                    right: 5px;
                    font-size: 30px;
                    color: #aaa;
                    cursor: pointer;
                    &:hover {
                        color: #000;
                    }
                }
            }
            .game-container-blank {
                width: 50%;
                border: 1px solid red;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px 0;
                .blank-game {
                    width: 125px;
                    height: 125px;
                    border: 1px solid #ccc;
                    line-height: 125px;
                    text-align: center;
                    margin-bottom: 20px;
                }
            }
        }
    }
    .sure-btn {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.ivu-table .max-cell {
    background-color: #ff6600;
    color: #fff;
}
.table-container {
    .best-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
    /deep/ .ivu-table td {
        line-height: 48px;
    }
}
</style>
