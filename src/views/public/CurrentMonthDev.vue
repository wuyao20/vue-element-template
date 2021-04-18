<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">条线：</label>
      <el-select v-model="listQuery.module" class="filter-item" style="width: 200px;">
        <el-option v-for="option in options" :key="option.key" :label="option.key" :value="option.value"></el-option>
      </el-select>
      <el-button type="primary" :loading="btnLoading" icon="el-icon-search" class="filter-item" @click="handleQuery">search</el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      border
      fit
      highlight-current-row
      stripe
      :data="list"
      style="width: 100%; overflow: hidden;"
    >
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
      <el-table-column label="整体发展量" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.whole }}
        </template>
      </el-table-column>
      <el-table-column label="非活" align="center">
        <template slot-scope="scope">
          {{ scope.row.wholeNoActive }}
        </template>
      </el-table-column>
      <el-table-column label="非活率" align="center">
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
    <div id="public-chart" style="width: 100%; height: 400px; margin-top: 50px;" />
  </div>
</template>

<script>
import { currentMonthWhole } from '@/api/public'
import { getPercent } from '@/utils'

export default {
  name: 'CurrentMonthDev',
  data() {
    return {
      listQuery: {
        module: '',
      },
      btnLoading: false,
      options: [
        { key: '整体', value: 'whole' },
        { key: '社渠整体', value: 'sociologyWhole' },
        { key: '自营整体', value: 'selfWhole' },
        { key: '电商整体', value: 'onlineWhole' }
      ],
      list: [],
      tableLoading: false,
      chart: undefined,
      option: {},
      xAxisData: [],
      yAxisWhole: [],
      yAxisWholeNoActive: [],
      yAxisWholeNoNet: [],
      yAxisWholeFuse: [],
      yAxisWholeNoActivePercent: []
    }
  },
  mounted() {
    // console.log(document.getElementById('public-chart'))
    this.chart = this.$echarts.init(document.getElementById('public-chart'))
    this.handleQuery()
  },
  methods: {
    handleQuery() {
      this.btnLoading = true
      this.tableLoading = true
      currentMonthWhole().then(res => {
        this.list = res.obj.map(item => {
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
        const temp = this.list.slice(0, this.list.length-2)
        this.xAxisData = temp.map(item => item.area)
        this.yAxisWhole = temp.map(item => item.whole)
        this.yAxisWholeNoActive = temp.map(item => item.wholeNoActive)
        this.yAxisWholeNoNet = temp.map(item => item.wholeNoNet)
        this.yAxisWholeFuse  = temp.map(item => item.wholeFuse)
        this.yAxisWholeNoActivePercent = temp.map(item => item.wholeNoActivePercent)
        console.log(this.yAxisWholeNoActivePercent)
        this.btnLoading = false
        this.tableLoading = false
        this._initOption()
      })
    },
    _initOption() {
      this.option = {
        title: {
          text: '公众当月总发展量'
        },
        grid: {
          top: '18%'
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: true },
            // magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
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
          data: ['发展量', '非活', '非活率', '异网', '融合']
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
            max: 1,
          }
        ],
        series: [
          {
            name: '发展量',
            type: 'bar',
            data: this.yAxisWhole,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top'
                }
              }
            }
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
            name: '融合',
            type: 'bar',
            data: this.yAxisWholeFuse
          }
        ]
      }
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
