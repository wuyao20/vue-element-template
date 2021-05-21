<template>
  <div class="app-container">
    <h3 style="text-align: center">当天发展量报表</h3>
    <el-table
      v-loading="tableLoading"
      fit
      border
      :data="list"
      highlight-current-row
      style="width: 100%;"
      :default-sort="{prop: 'conversionRate', order: 'descending'}"
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
      <el-table-column label="激活" align="center">
        <template slot-scope="scope">
          {{ scope.row.activation }}
        </template>
      </el-table-column>
      <el-table-column label="50以上充值" align="center">
        <template slot-scope="scope">
          {{ scope.row.fiftyMore }}
        </template>
      </el-table-column>
      <el-table-column label="100以上充值" align="center">
        <template slot-scope="scope">
          {{ scope.row.hundredMore }}
        </template>
      </el-table-column>
      <el-table-column
        prop="conversionRate"
        label="50以上充值率"
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
        label="100以上充值率"
        :sortable="sortBoolean"
        :sort-method="(a, b) => percentHundredSort(a, b)"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.hundredConversionRate }}
        </template>
      </el-table-column>
    </el-table>
    <div id="thatDayChart" style="width: 100%; height: 400px; margin-top: 50px;" />
  </div>
</template>

<script>
import { commerceThatDayDev } from '@/api/commerce'
export default {
  name: 'ThatDay',
  data() {
    return {
      list: [],
      sortBoolean: true,
      tableLoading: false,
      option: {},
      thatDayChart: undefined,
      xAxisData: [],
      yAxisActivation: [],
      yAxisFiftyMore: [],
      yAxisHundredMore: [],
      yAxisConversionRate: [],
      yAxisHundredConversionRate: []
    }
  },
  mounted() {
    this.thatDayChart = this.$echarts.init(document.getElementById('thatDayChart'))
    // this.initOptions()
  },
  created() {
    commerceThatDayDev().then(res => {
      this.list = res.obj.filter(item => {
        return item.area !== '整体'
      })
      this.xAxisData = this.list.map(item => {
        return item.area
      })
      this.yAxisActivation = this.list.map(item => item.activation)
      this.yAxisFiftyMore = this.list.map(item => item.fiftyMore)
      this.yAxisHundredMore = this.list.map(item => item.hundredMore)
      this.yAxisConversionRate = this.list.map(item => /\d+\.\d+/.exec(item.conversionRate)[0])
      this.yAxisHundredConversionRate = this.list.map(item => /\d+\.\d+/.exec(item.hundredConversionRate)[0])
      setTimeout(() => {
        this.tableLoading = false
        this.initOptions()
      }, 1000)
    })
  },
  methods: {
    percentSort(a, b) {
      return parseFloat(/\d+\.\d+/.exec(a.conversionRate)) - parseFloat(/\d+\.\d+/.exec(b.conversionRate))
    },
    percentHundredSort(a, b) {
      return parseFloat(/\d+\.\d+/.exec(a.hundredConversionRate)) - parseFloat(/\d+\.\d+/.exec(b.hundredConversionRate))
    },
    initOptions() {
      this.option = {
        title: {
          text: '电商当天发展量'
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
          data: ['激活', '50以上转化', '100以上转化', '50以上转化率', '100以上转化率'],
          bottom: 0
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
      this.thatDayChart.setOption(this.option)
    }
  }
}
</script>

<style scoped>

</style>
