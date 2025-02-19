<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">时间范围：</label>
      <el-date-picker
        v-model="date"
        class="filter-item"
        type="daterange"
        align="left"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        :default-time="['00:00:00', '00:00:00']"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
      <el-button
        v-waves
        type="primary"
        icon="el-icon-search"
        class="filter-item"
        :loading="btnLoading"
        @click="handleFilter"
      >search
      </el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      fit
      border
      :data="list"
      highlight-current-row
      style="width: 100%;"
      :default-sort="{prop: 'conversionRate', order: 'descending'}"
      :cell-style="tableCellStyle"
    >
      <el-table-column label="id" width="80px" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="区县" align="center">
        <template slot-scope="scope">
          {{ scope.row.area }}
        </template>
      </el-table-column>
      <el-table-column label="订单总数" align="center">
        <template slot-scope="scope">
          {{ scope.row.ordersCount }}
        </template>
      </el-table-column>
      <el-table-column label="激活" align="center">
        <template slot-scope="scope">
          {{ scope.row.activation }}
        </template>
      </el-table-column>
      <el-table-column label="50以上转化" align="center">
        <template slot-scope="scope">
          {{ scope.row.fiftyMore }}
        </template>
      </el-table-column>
      <el-table-column label="100以上转化" align="center">
        <template slot-scope="scope">
          {{ scope.row.hundredMore }}
        </template>
      </el-table-column>
      <el-table-column
        prop="conversionRate"
        label="50以上转化率"
        :sortable="sortBoolean"
        :sort-method="(a, b) => percentSort(a, b)"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.conversionRate }}
        </template>
      </el-table-column>
      <el-table-column
        prop="conversionRate"
        label="100以上转化率"
        :sortable="sortBoolean"
        :sort-method="(a, b) => percentHundredSort(a, b)"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.hundredConversionRate }}
        </template>
      </el-table-column>
    </el-table>
    <div id="conversion-chart" style="width: 100%; height: 400px; margin-top: 50px;" />
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { commerceRate } from '@/api/commerce'

export default {
  name: 'Conversion',
  directives: { waves },
  data() {
    return {
      sortBoolean: true,
      date: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date(new Date().toLocaleDateString())
            const start = new Date(new Date().toLocaleDateString())
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            console.log(start, end)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date(new Date().toLocaleDateString())
            const start = new Date(new Date().toLocaleDateString())
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date(new Date().toLocaleDateString())
            const start = new Date(new Date().toLocaleDateString())
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      listQuery: {
        startTime: '',
        endTime: ''
      },
      list: [],
      btnLoading: false,
      tableLoading: false,
      barData: {},
      lineData: {},
      xAxisData: [],
      yAxisOrderCount: [],
      yAxisActivation: [],
      yAxisFiftyMore: [],
      yAxisHundredMore: [],
      yAxisConversionRate: [],
      yAxisHundredConversionRate: [],
      option: {},
      conversionChart: undefined
    }
  },
  mounted() {
    this.conversionChart = this.$echarts.init(document.getElementById('conversion-chart'))
    this.handleFilter()
  },
  methods: {
    tableCellStyle({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
      if (rowIndex <= 2 && columnIndex === 6) {
        return 'background-color: rgba(45,224,12,1); color: white;'
      }
      if (rowIndex >= 7 && columnIndex === 6) {
        return 'background-color: rgba(240,8,24,1); color: white;'
      }
      return ''
    },
    percentSort(a, b) {
      return parseFloat(/\d+\.\d+/.exec(a.conversionRate)) - parseFloat(/\d+\.\d+/.exec(b.conversionRate))
    },
    percentHundredSort(a, b) {
      return parseFloat(/\d+\.\d+/.exec(a.hundredConversionRate)) - parseFloat(/\d+\.\d+/.exec(b.hundredConversionRate))
    },
    handleFilter() {
      this.btnLoading = true
      if (this.date === null) {
        this.listQuery.startTime = ''
        this.listQuery.endTime = ''
      } else {
        this.listQuery.startTime = this.date[0]
        this.listQuery.endTime = this.date[1]
      }
      commerceRate(this.listQuery).then(res => {
        // this.list = res.obj.filter(item => {
        //   return item.area !== '整体'
        // })
        this.list = res.obj
        const tempArray = res.obj.filter(item => {
          return item.area !== '整体'
        })
        this.xAxisData = tempArray.map(item => item.area)
        this.yAxisOrderCount = tempArray.map(item => {
          return item.ordersCount
        })
        this.yAxisActivation = tempArray.map(item => {
          return item.activation
        })
        this.yAxisFiftyMore = tempArray.map(item => {
          return item.fiftyMore
        })
        this.yAxisHundredMore = tempArray.map(item => {
          return item.hundredMore
        })
        this.yAxisConversionRate = tempArray.map(item => {
          return /\d+\.\d+/.exec(item.conversionRate)[0]
        })
        this.yAxisHundredConversionRate = tempArray.map(item => {
          return /\d+\.\d+/.exec(item.hundredConversionRate)[0]
        })
        this.initOptions()
        this.btnLoading = false
      })
    },
    initOptions() {
      this.option = {
        title: {
          text: '电商转化报表'
        },
        grid: {
          top: '18%'
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
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: true },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['订单量', '激活', '50以上转化', '100以上转化', '50以上转化率', '100以上转化率']
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
            name: '订单量',
            axisLabel: {
              formatter: '{value}单'
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: '转化率',
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '订单量',
            type: 'bar',
            data: this.yAxisOrderCount
          },
          {
            name: '激活',
            type: 'bar',
            data: this.yAxisActivation
          },
          {
            name: '50以上转化',
            type: 'bar',
            data: this.yAxisFiftyMore
          },
          {
            name: '100以上转化',
            type: 'bar',
            data: this.yAxisHundredMore
          },
          {
            name: '50以上转化率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisConversionRate
          },
          {
            name: '100以上转化率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisHundredConversionRate
          }
        ]
      }
      this.conversionChart.setOption(this.option)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
