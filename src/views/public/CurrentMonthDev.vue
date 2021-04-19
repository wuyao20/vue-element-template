<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">条线：</label>
      <el-select v-model="listQuery.module" class="filter-item" style="width: 200px;">
        <el-option v-for="option in options" :key="option.key" :label="option.key" :value="option.value"></el-option>
      </el-select>
      <el-button type="primary" :loading="btnLoading" icon="el-icon-search" class="filter-item" @click="handleQuery">
        search
      </el-button>
    </div>
    <div class="table-header">公众当月整体发展</div>
    <el-table
      v-loading="tableLoading"
      border
      fit
      highlight-current-row
      stripe
      :data="list"
      style="width: 100%; overflow: hidden;"
      :default-sort="{prop: 'noActivePercent', order: 'ascending'}"
    >
      <!--      :cell-style="tableCellStyle"-->
    <el-table-column align="center" fixed="left" label="ID" width="80">
      <template slot-scope="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column label="区县" fixed="left" align="center">
      <template slot-scope="scope">
        {{ scope.row.area }}
      </template>
    </el-table-column>
    <el-table-column label="整体发展量" prop="whole" sortable align="center" width="150">
      <template slot-scope="scope">
        {{ scope.row.whole }}
      </template>
    </el-table-column>
    <el-table-column label="非活" align="center">
      <template slot-scope="scope">
        {{ scope.row.wholeNoActive }}
      </template>
    </el-table-column>
    <el-table-column label="非活率" prop="noActivePercent" :sortable="sortBoolean"
                     :sort-method="(a, b) => percentSort(a, b)" align="center" width="150">
      <template slot-scope="scope">
        {{ scope.row.wholeNoActivePercent }}
      </template>
    </el-table-column>
    <el-table-column label="整体异网" align="center">
      <template slot-scope="scope">
        {{ scope.row.wholeNoNet }}
      </template>
    </el-table-column>
    <el-table-column label="整体异网率" align="center" width="150">
      <template slot-scope="scope">
        {{ scope.row.wholeNoNetPercent }}
      </template>
    </el-table-column>
    <el-table-column label="融合" align="center">
      <template slot-scope="scope">
        {{ scope.row.wholeFuse }}
      </template>
    </el-table-column>
    <el-table-column label="融合率" align="center">
      <template slot-scope="scope">
        {{ scope.row.wholeFusePercent }}
      </template>
    </el-table-column>
    <el-table-column label="社渠整体发展量" align="center" width="150">
      <template slot-scope="scope">
        {{ scope.row.sociologyWhole }}
      </template>
    </el-table-column>
    <el-table-column label="社渠非活" align="center">
      <template slot-scope="scope">
        {{ scope.row.sociologyWholeNoActive }}
      </template>
    </el-table-column>
    <el-table-column label="社渠非活率" align="center" width="150">
      <template slot-scope="scope">
        {{ scope.row.sociologyWholeNoActivePercent }}
      </template>
    </el-table-column>
    <el-table-column label="社渠整体异网" align="center" width="150">
      <template slot-scope="scope">
        {{ scope.row.sociologyWholeNoNet }}
      </template>
    </el-table-column>
    <el-table-column label="社渠整体异网率" align="center" width="150">
      <template slot-scope="scope">
        {{ scope.row.sociologyWholeNoNetPercent }}
      </template>
    </el-table-column>
    <el-table-column label="社渠融合" align="center">
      <template slot-scope="scope">
        {{ scope.row.sociologyWholeFuse }}
      </template>
    </el-table-column>
    <el-table-column label="社渠融合率" align="center" width="150">
      <template slot-scope="scope">
        {{ scope.row.sociologyWholeFusePercent }}
      </template>
    </el-table-column>
    </el-table>
    <div id="public-chart" style="width: 100%; height: 400px; margin-top: 80px;"/>
    <div id="sociology-chart" style="width: 100%; height: 400px; margin-top: 80px;"/>
    <div id="self-chart" style="width: 100%; height: 400px; margin-top: 80px;"/>
    <div id="online-chart" style="width: 100%; height: 400px; margin-top: 80px;"/>
  </div>
</template>

<script>
import {currentMonthWhole} from '@/api/public'
import {getPercent} from '@/utils'

export default {
  name: 'CurrentMonthDev',
  data() {
    return {
      sortBoolean: true,
      listQuery: {
        module: '',
      },
      btnLoading: false,
      options: [
        {key: '整体', value: 'whole'},
        {key: '社渠整体', value: 'sociologyWhole'},
        {key: '自营整体', value: 'selfWhole'},
        {key: '电商整体', value: 'onlineWhole'}
      ],
      list: [],
      tableLoading: false,
      publicChart: undefined,
      sociologyChart: undefined,
      selfChart: undefined,
      onlineChart: undefined,
      publicOption: {},
      sociologyOption: {},
      selfOption: {},
      onlineOption: {},
      xAxisData: [],
      yAxisWhole: [],
      yAxisWholeNoActive: [],
      yAxisWholeNoNet: [],
      yAxisWholeFuse: [],
      yAxisWholeNoActivePercent: [],
      yAxisWholeNoNetPercent: [],
      yAxisWholeFusePercent: [],
      yAxisSociologyWhole: [],
      yAxisSociologyWholeNoActive: [],
      yAxisSociologyWholeNoNet: [],
      yAxisSociologyWholeFuse: [],
      yAxisSociologyWholeNoActivePercent: [],
      yAxisSociologyWholeNoNetPercent: [],
      yAxisSociologyWholeFusePercent: [],
      yAxisSelfWhole: [],
      yAxisSelfWholeNoActive: [],
      yAxisSelfWholeNoNet: [],
      yAxisSelfWholeFuse: [],
      yAxisSelfWholeNoActivePercent: [],
      yAxisSelfWholeNoNetPercent: [],
      yAxisSelfWholeFusePercent: [],
      yAxisOnlineWhole: [],
      yAxisOnlineWholeNoActive: [],
      yAxisOnlineWholeNoNet: [],
      yAxisOnlineWholeFuse: [],
      yAxisOnlineWholeNoActivePercent: [],
      yAxisOnlineWholeNoNetPercent: [],
      yAxisOnlineWholeFusePercent: []
    }
  },
  mounted() {
    this.publicChart = this.$echarts.init(document.getElementById('public-chart'))
    this.sociologyChart = this.$echarts.init(document.getElementById('sociology-chart'))
    this.selfChart = this.$echarts.init(document.getElementById('self-chart'))
    this.onlineChart = this.$echarts.init(document.getElementById('online-chart'))
    this.handleQuery()
  },
  methods: {
    handleQuery() {
      this.btnLoading = true
      this.tableLoading = true
      currentMonthWhole().then(res => {
        this.list = res.obj.map(item => {
          item.whole = parseInt(item.whole)
          item.wholeNoActivePercent = getPercent(item.wholeNoActive, item.whole)
          item.wholeNoNetPercent = getPercent(item.wholeNoNet, item.whole)
          item.wholeFusePercent = getPercent(item.wholeFuse, item.whole)
          item.sociologyWholeNoActivePercent = getPercent(item.sociologyWholeNoActive, item.sociologyWhole)
          item.sociologyWholeNoNetPercent = getPercent(item.sociologyWholeNoNet, item.sociologyWhole)
          item.sociologyWholeFusePercent = getPercent(item.sociologyWholeFuse, item.sociologyWhole)
          item.selfWholeNoActivePercent = getPercent(item.selfWholeNoActive, item.selfWhole)
          item.selfWholeNoNetPercent = getPercent(item.selfWholeNoNet, item.selfWhole)
          item.selfWholeFusePercent = getPercent(item.selfWholeFuse, item.selfWhole)
          item.onlineWholeNoActivePercent = getPercent(item.onlineWholeNoActive, item.onlineWhole)
          item.onlineWholeNoNetPercent = getPercent(item.onlineWholeNoNet, item.onlineWhole)
          item.onlineWholeFusePercent = getPercent(item.onlineWholeFuse, item.onlineWhole)
          return item
        })
        const temp = this.list.slice(0, this.list.length - 2)

        this.xAxisData = temp.map(item => item.area)
        this.yAxisWhole = temp.map(item => item.whole)
        this.yAxisWholeNoActive = temp.map(item => item.wholeNoActive)
        this.yAxisWholeNoNet = temp.map(item => item.wholeNoNet)
        this.yAxisWholeFuse = temp.map(item => item.wholeFuse)
        this.yAxisWholeNoActivePercent = temp.map(item => item.wholeNoActivePercent.split('%')[0])
        this.yAxisWholeNoNetPercent = temp.map(item => item.wholeNoNetPercent.split('%')[0])
        this.yAxisWholeFusePercent = temp.map(item => item.wholeFusePercent.split('%')[0])

        this.yAxisSociologyWhole = temp.map(item => item.sociologyWhole)
        this.yAxisSociologyWholeNoActive = temp.map(item => item.sociologyWholeNoActive)
        this.yAxisSociologyWholeNoNet = temp.map(item => item.sociologyWholeNoNet)
        this.yAxisSociologyWholeFuse = temp.map(item => item.sociologyWholeFuse)
        this.yAxisSociologyWholeNoActivePercent = temp.map(item => item.sociologyWholeNoActivePercent.split('%')[0])
        this.yAxisSociologyWholeNoNetPercent = temp.map(item => item.sociologyWholeNoNetPercent.split('%')[0])
        this.yAxisSociologyWholeFusePercent = temp.map(item => item.sociologyWholeFusePercent.split('%')[0])

        this.yAxisSelfWhole = temp.map(item => item.selfWhole)
        this.yAxisSelfWholeNoActive = temp.map(item => item.selfWholeNoActive)
        this.yAxisSelfWholeNoNet = temp.map(item => item.selfWholeNoNet)
        this.yAxisSelfWholeFuse = temp.map(item => item.selfWholeFuse)
        this.yAxisSelfWholeNoActivePercent = temp.map(item => item.selfWholeNoActivePercent.split('%')[0])
        this.yAxisSelfWholeNoNetPercent = temp.map(item => item.selfWholeNoNetPercent.split('%')[0])
        this.yAxisSelfWholeFusePercent = temp.map(item => item.selfWholeFusePercent.split('%')[0])

        this.yAxisOnlineWhole = temp.map(item => item.onlineWhole)
        this.yAxisOnlineWholeNoActive = temp.map(item => item.onlineWholeNoActive)
        this.yAxisOnlineWholeNoNet = temp.map(item => item.onlineWholeNoNet)
        this.yAxisOnlineWholeFuse = temp.map(item => item.onlineWholeFuse)
        this.yAxisOnlineWholeNoActivePercent = temp.map(item => item.onlineWholeNoActivePercent.split('%')[0])
        this.yAxisOnlineWholeNoNetPercent = temp.map(item => item.onlineWholeNoNetPercent.split('%')[0])
        this.yAxisOnlineWholeFusePercent = temp.map(item => item.onlineWholeFusePercent.split('%')[0])

        this.btnLoading = false
        this.tableLoading = false
        this._initPublicOption()
        this._initSociologyOption()
        this._initSelfOption()
        this._initOnlineOption()
      })
    },
    tableCellStyle({row, column, rowIndex, columnIndex}) {
      // console.log(row, column, rowIndex, columnIndex)
      if (rowIndex <= 2 && columnIndex === 4) {
        return 'background-color: rgba(235,57,5,1);'
      }
      return ''
    },
    percentSort(a, b) {
      return parseFloat(/\d+\.\d+/.exec(a.wholeNoActivePercent)) - parseFloat(/\d+\.\d+/.exec(b.wholeNoActivePercent))
    },
    _initPublicOption() {
      this.publicOption = {
        title: {
          top: '0',
          left: '30',
          text: '公众当月总发展量'
        },
        grid: [
          {
            top: '100',
            width: '80%'
            // containLabel: true
          }
        ],
        toolbox: {
          right: '100',
          feature: {
            dataView: {show: true, readOnly: true},
            // magicType: { show: true, type: ['line', 'bar'] },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['发展量', '非活', '非活率', '异网', '异网率', '融合', '融合率'],
          selected: {
            '非活率': false,
            '异网率': false,
            '融合率': false
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '发展量',
            axisLabel: {
              formatter: '{value}户'
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: '百分比',
            min: 0,
            max: 100,
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '发展量',
            type: 'bar',
            data: this.yAxisWhole
          },
          {
            name: '非活',
            type: 'bar',
            data: this.yAxisWholeNoActive
          },
          {
            name: '非活率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisWholeNoActivePercent
          },
          {
            name: '异网',
            type: 'bar',
            data: this.yAxisWholeNoNet
          },
          {
            name: '异网率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisWholeNoNetPercent
          },
          {
            name: '融合',
            type: 'bar',
            data: this.yAxisWholeFuse
          },
          {
            name: '融合率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisWholeFusePercent
          }
        ]
      }
      this.publicChart.setOption(this.publicOption)
    },
    _initSociologyOption() {
      this.sociologyOption = {
        title: {
          top: '0',
          left: '30',
          text: '社渠当月总发展量'
        },
        grid: [
          {
            top: '100',
            width: '80%'
            // containLabel: true
          }
        ],
        toolbox: {
          right: '100',
          feature: {
            dataView: {show: true, readOnly: true},
            // magicType: { show: true, type: ['line', 'bar'] },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['发展量', '非活', '非活率', '异网', '异网率', '融合', '融合率'],
          selected: {
            '非活率': false,
            '异网率': false,
            '融合率': false
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '发展量',
            axisLabel: {
              formatter: '{value}户'
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: '百分比',
            min: 0,
            max: 100,
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '发展量',
            type: 'bar',
            data: this.yAxisSociologyWhole
          },
          {
            name: '非活',
            type: 'bar',
            data: this.yAxisSociologyWholeNoActive
          },
          {
            name: '非活率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisSociologyWholeNoActivePercent
          },
          {
            name: '异网',
            type: 'bar',
            data: this.yAxisSociologyWholeNoNet
          },
          {
            name: '异网率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisSociologyWholeNoNetPercent
          },
          {
            name: '融合',
            type: 'bar',
            data: this.yAxisSociologyWholeFuse
          },
          {
            name: '融合率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisSociologyWholeFusePercent
          }
        ]
      }
      this.sociologyChart.setOption(this.sociologyOption)
    },
    _initSelfOption() {
      this.selfOption = {
        title: {
          top: '0',
          left: '30',
          text: '自营当月总发展量'
        },
        grid: [
          {
            top: '100',
            width: '80%'
            // containLabel: true
          }
        ],
        toolbox: {
          right: '100',
          feature: {
            dataView: {show: true, readOnly: true},
            // magicType: { show: true, type: ['line', 'bar'] },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['发展量', '非活', '非活率', '异网', '异网率', '融合', '融合率'],
          selected: {
            '非活率': false,
            '异网率': false,
            '融合率': false
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '发展量',
            axisLabel: {
              formatter: '{value}户'
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: '百分比',
            min: 0,
            max: 100,
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '发展量',
            type: 'bar',
            data: this.yAxisSelfWhole
          },
          {
            name: '非活',
            type: 'bar',
            data: this.yAxisSelfWholeNoActive
          },
          {
            name: '非活率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisSelfWholeNoActivePercent
          },
          {
            name: '异网',
            type: 'bar',
            data: this.yAxisSelfWholeNoNet
          },
          {
            name: '异网率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisSelfWholeNoNetPercent
          },
          {
            name: '融合',
            type: 'bar',
            data: this.yAxisSelfWholeFuse
          },
          {
            name: '融合率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisSelfWholeFusePercent
          }
        ]
      }
      this.selfChart.setOption(this.selfOption)
    },
    _initOnlineOption() {
      this.onlineOption = {
        title: {
          top: '0',
          left: '30',
          text: '电商当月总发展量'
        },
        grid: [
          {
            top: '100',
            width: '80%'
            // containLabel: true
          }
        ],
        toolbox: {
          right: '100',
          feature: {
            dataView: {show: true, readOnly: true},
            // magicType: { show: true, type: ['line', 'bar'] },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['发展量', '非活', '非活率', '异网', '异网率', '融合', '融合率'],
          selected: {
            '非活率': false,
            '异网率': false,
            '融合率': false
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '发展量',
            axisLabel: {
              formatter: '{value}户'
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: '百分比',
            min: 0,
            max: 100,
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '发展量',
            type: 'bar',
            data: this.yAxisOnlineWhole
          },
          {
            name: '非活',
            type: 'bar',
            data: this.yAxisOnlineWholeNoActive
          },
          {
            name: '非活率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisOnlineWholeNoActivePercent
          },
          {
            name: '异网',
            type: 'bar',
            data: this.yAxisOnlineWholeNoNet
          },
          {
            name: '异网率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisOnlineWholeNoNetPercent
          },
          {
            name: '融合',
            type: 'bar',
            data: this.yAxisOnlineWholeFuse
          },
          {
            name: '融合率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisOnlineWholeFusePercent
          }
        ]
      }
      this.onlineChart.setOption(this.onlineOption)
    }
  }
}
</script>

<style lang="stylus" scoped>
.table-header
  font-size 30px
  font-weight bold
  text-align center
  margin-bottom 12px
  letter-spacing 2px

.el-table
  .warning-cell
    background-color rgba(235, 57, 5, 1)
</style>
