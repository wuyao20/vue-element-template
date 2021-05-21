<template>
  <div class="app-container">
    <div class="title" style="margin-bottom: 20px;">
      日发展报表
    </div>
    <el-table
      v-loading="tableLoading"
      fit
      border
      highlight-current-row
      :data="list"
      style="width: 100%;"
      :cell-style="tableCellStyle"
      show-summary
      size="mini"
    >
      <el-table-column prop="area" label="客服中心" align="center" fixed></el-table-column>
      <el-table-column label="社渠" align="center">
        <el-table-column prop="socIndex" label="日指标" align="center"></el-table-column>
        <el-table-column prop="socChannel" :sortable="true" label="完成" align="center"></el-table-column>
        <el-table-column label="完成率" align="center">
          <template slot-scope="{row}">
            {{ _getPercent(row.socChannel, row.socIndex) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="自营" align="center">
        <el-table-column prop="selfIndex" label="日指标" align="center"></el-table-column>
        <el-table-column prop="selfChannel" label="完成" :sortable="true" align="center"></el-table-column>
        <el-table-column label="完成率" align="center">
          <template slot-scope="{row}">
            {{ _getPercent(row.selfChannel, row.selfIndex) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="电商" align="center">
        <el-table-column prop="onlineIndex" label="日指标" align="center"></el-table-column>
        <el-table-column prop="onlineChannel" :sortable="true" label="完成" align="center"></el-table-column>
        <el-table-column label="完成率" align="center">
          <template slot-scope="{row}">
            {{ _getPercent(row.onlineChannel, row.onlineIndex) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="社渠+电商" align="center">
        <el-table-column label="日指标" align="center">
          <template slot-scope="{row}">
            {{row.socIndex + row.onlineIndex}}
          </template>
        </el-table-column>
        <el-table-column label="完成" align="center">
          <template slot-scope="{row}">
            {{row.socChannel + row.onlineChannel}}
          </template>
        </el-table-column>
        <el-table-column label="完成率" align="center">
          <template slot-scope="{row}">
            {{ _getPercent(row.socChannel + row.onlineChannel, row.socIndex + row.onlineIndex) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="大公众" align="center">
        <el-table-column label="日指标" align="center">
          <template slot-scope="{row}">
            {{row.socIndex + row.onlineIndex + row.socIndex}}
          </template>
        </el-table-column>
        <el-table-column label="完成" align="center">
          <template slot-scope="{row}">
            {{row.socChannel + row.onlineChannel + row.socChannel}}
          </template>
        </el-table-column>
        <el-table-column label="完成率" align="center">
          <template slot-scope="{row}">
            {{ _getPercent(row.socChannel + row.onlineChannel + row.socChannel, row.socIndex + row.onlineIndex + row.socIndex) }}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <div id="dayDevChart" style="width: 100%; height: 600px; margin-top: 40px;"></div>
  </div>
</template>

<script>
import { getPercent } from '@/utils/index'
import { dayDevelopment } from "@/api/public";

export default {
  name: "DayDevelopment",
  data() {
    return {
      tableLoading: false,
      list: [],
      xAxisData: [],
      yAxisSocCompletion: [],
      yAxisSocCompletionPercent: [],
      yAxisOnlineCompletion: [],
      yAxisOnlineCompletionPercent: [],
      yAxisSelfCompletion: [],
      yAxisSelfCompletionPercent: [],
      dayDevChart: undefined,
      option: {}
    }
  },
  created() {
    dayDevelopment().then(res => {
      const { success, obj } = res
      if(!success) {
        this.list = obj.map(item => {
          item.onlinePercent = Math.floor(item.onlineChannel / item.onlineIndex * 100) / 100
          item.selfPercent = Math.floor(item.selfChannel / item.selfIndex * 100) / 100
          item.socPercent = Math.floor(item.socChannel / item.socIndex * 100) / 100
          item.socAndOnlinePercent =  Math.floor((item.onlineChannel + item.socChannel) / (item.onlineIndex + item.socIndex) * 100) / 100
          item.totalPercent =  Math.floor((item.onlineChannel + item.socChannel + item.selfChannel) / (item.onlineIndex + item.socIndex + item.selfIndex) * 100) / 100
          return item
        }).sort((item1, item2) => {
          return item1.onlinePercent - item2.onlinePercent
        }).reverse().map((item,index) => {
          item.onlinePercentIndex = index
          return item
        }).sort((item1, item2) => {
          return item1.selfPercent - item2.selfPercent
        }).reverse().map((item,index) => {
          item.selfPercentIndex = index
          return item
        }).sort((item1, item2) => {
          return item1.socPercent - item2.socPercent
        }).reverse().map((item,index) => {
          item.socPercentIndex = index
          return item
        }).sort((item1, item2) => {
          return item1.socAndOnlinePercent - item2.socAndOnlinePercent
        }).reverse().map((item,index) => {
          item.socAndOnlinePercentIndex = index
          return item
        }).sort((item1, item2) => {
          return item1.totalPercent - item2.totalPercent
        }).reverse().map((item,index) => {
          item.totalPercentIndex = index
          return item
        })
        this.xAxisData = this.list.map(item => item.area)
        this.yAxisSocCompletion = this.list.map(item => item.socChannel)
        this.yAxisSocCompletionPercent = this.list.map(item => item.socPercent)
        this.yAxisSelfCompletion = this.list.map(item => item.selfChannel)
        this.yAxisSelfCompletionPercent = this.list.map(item => item.selfPercent)
        this.yAxisOnlineCompletion = this.list.map(item => item.onlineChannel)
        this.yAxisOnlineCompletionPercent = this.list.map(item => item.onlinePercent)
      } else {
        this.$notify.error({
          title: 'error',
          message: '获取数据失败，请刷新重试。。。'
        })
      }
    })
  },
  mounted() {
    this.dayDevChart = this.$echarts.init(document.getElementById('dayDevChart'))
    this.$nextTick(() => {
      this._dayDevelopment()
    })
  },
  methods: {
    _dayDevelopment() {
      dayDevelopment().then(res => {
        const { success, obj } = res
        if(!success) {
          this.list = obj.map(item => {
            item.onlinePercent = Math.floor(item.onlineChannel / item.onlineIndex * 100) / 100
            item.selfPercent = Math.floor(item.selfChannel / item.selfIndex * 100) / 100
            item.socPercent = Math.floor(item.socChannel / item.socIndex * 100) / 100
            item.socAndOnlinePercent =  Math.floor((item.onlineChannel + item.socChannel) / (item.onlineIndex + item.socIndex) * 100) / 100
            item.totalPercent =  Math.floor((item.onlineChannel + item.socChannel + item.selfChannel) / (item.onlineIndex + item.socIndex + item.selfIndex) * 100) / 100
            return item
          }).sort((item1, item2) => {
            return item1.onlinePercent - item2.onlinePercent
          }).reverse().map((item,index) => {
            item.onlinePercentIndex = index
            return item
          }).sort((item1, item2) => {
            return item1.selfPercent - item2.selfPercent
          }).reverse().map((item,index) => {
            item.selfPercentIndex = index
            return item
          }).sort((item1, item2) => {
            return item1.socPercent - item2.socPercent
          }).reverse().map((item,index) => {
            item.socPercentIndex = index
            return item
          }).sort((item1, item2) => {
            return item1.socAndOnlinePercent - item2.socAndOnlinePercent
          }).reverse().map((item,index) => {
            item.socAndOnlinePercentIndex = index
            return item
          }).sort((item1, item2) => {
            return item1.totalPercent - item2.totalPercent
          }).reverse().map((item,index) => {
            item.totalPercentIndex = index
            return item
          })
          this.xAxisData = this.list.map(item => item.area)
          this.yAxisSocCompletion = this.list.map(item => item.socChannel)
          this.yAxisSocCompletionPercent = this.list.map(item => item.socPercent * 100)
          this.yAxisSelfCompletion = this.list.map(item => item.selfChannel)
          this.yAxisSelfCompletionPercent = this.list.map(item => item.selfPercent * 100)
          this.yAxisOnlineCompletion = this.list.map(item => item.onlineChannel)
          this.yAxisOnlineCompletionPercent = this.list.map(item => item.onlinePercent * 100)
        } else {
          this.$notify.error({
            title: 'error',
            message: '获取数据失败，请刷新重试。。。'
          })
        }
        this.initOptions()
      })
    },
    _getPercent(num, total) {
      return getPercent(num, total)
    },
    tableCellStyle({ row, columnIndex }) {
      if (columnIndex === 3 && row.socPercentIndex < 3) {
        return 'background-color: rgba(45,224,12,1); color: white;'
      }
      if (columnIndex === 3 && row.socPercentIndex > 7) {
        return 'background-color: rgba(240,8,24,1); color: white;'
      }
      if (columnIndex === 6 && row.selfPercentIndex < 3) {
        return 'background-color: rgba(45,224,12,1); color: white;'
      }
      if (columnIndex === 6 && row.selfPercentIndex > 7) {
        return 'background-color: rgba(240,8,24,1); color: white;'
      }
      if (columnIndex === 9 && row.onlinePercentIndex < 3) {
        return 'background-color: rgba(45,224,12,1); color: white;'
      }
      if (columnIndex === 9 && row.onlinePercentIndex > 7) {
        return 'background-color: rgba(240,8,24,1); color: white;'
      }
      if (columnIndex === 12 && row.socAndOnlinePercentIndex < 3) {
        return 'background-color: rgba(45,224,12,1); color: white;'
      }
      if (columnIndex === 12 && row.socAndOnlinePercentIndex > 7) {
        return 'background-color: rgba(240,8,24,1); color: white;'
      }
      if (columnIndex === 15 && row.totalPercentIndex < 3) {
        return 'background-color: rgba(45,224,12,1); color: white;'
      }
      if (columnIndex === 15 && row.totalPercentIndex > 7) {
        return 'background-color: rgba(240,8,24,1); color: white;'
      }
    },
    initOptions() {
      this.option = {
        title: {
          text: '日发展量'
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
          data: ['社渠', '社渠完成率', '自营', '自营完成率', '电商', '电商完成率']
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
            name: '完成率',
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '社渠',
            type: 'bar',
            data: this.yAxisSocCompletion,
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '社渠完成率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisSocCompletionPercent
          },
          {
            name: '自营',
            type: 'bar',
            data: this.yAxisSelfCompletion,
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '自营完成率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisSelfCompletionPercent
          },
          {
            name: '电商',
            type: 'bar',
            data: this.yAxisOnlineCompletion,
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '电商完成率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisOnlineCompletionPercent
          },
        ]
      }
      this.dayDevChart.setOption(this.option)
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-container
  & >>> .el-table
    thead
      font-weight bolder
      color black
</style>
