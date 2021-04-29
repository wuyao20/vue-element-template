<template>
  <div class="app-container">
    <div class="filter-container">
      <FilenameOption class="filter-item" v-model="filename" />
      <AutoWidthOption class="filter-item" v-model="autoWidth" />
      <BookTypeOption class="filter-item" v-model="bookType" />
      <el-button class="filter-item" :loading="downloadLoading" type="primary" icon="el-icon-document" @click="handleDownload">
        导出Excel
      </el-button>
    </div>
    <div class="title">整体发展情况报表(到厅)</div>
    <el-table
      fit
      border
      highlight-current-row
      :data="list"
      height="600"
      style="width: 100%;"
      :cell-style="tableCellStyle"
    >
      <el-table-column label="ID" align="center" fixed width="70">
        <template slot-scope="{$index}">
          {{$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="区域" prop="area" fixed align="center" :filters="filtersArea" :filter-method="filterMethod"></el-table-column>
      <el-table-column label="店长名称" prop="shopownerName" fixed align="center" :filters="filtersShopManager" :filter-method="filterMethod" width="110"></el-table-column>
      <el-table-column label="门店名称" prop="channelName" align="center" :filters="filterChannelName" :filter-method="filterMethod" width="110"></el-table-column>
      <el-table-column label="任务指标" prop="taskIndexNum" align="center"></el-table-column>
      <el-table-column label="月整体发展量" prop="wholeDevelop" align="center"></el-table-column>
      <el-table-column label="整体指标完成" prop="wholeIndexFinishPpContent" align="center" ></el-table-column>
<!--      <el-table-column label="指标完成排名" prop="wholeIndexFinishPpOrder" align="center" width="140"></el-table-column>-->
      <el-table-column label="月整体发展量不含副卡" prop="wholeDevelopNoSecCard" align="center" ></el-table-column>
      <el-table-column label="不含副卡占比" prop="wholeNoSecCardPp" align="center" ></el-table-column>
<!--      <el-table-column label="不含副卡占比排序" prop="wholeNoSecCardPpOrder" align="center" width="140"></el-table-column>-->
      <el-table-column label="整体异网" prop="wholeOther" align="center" ></el-table-column>
      <el-table-column label="整体异网占比" prop="wholeOtherPp" align="center" ></el-table-column>
<!--      <el-table-column label="整体异网占比排序" prop="wholeOtherPpOrder" align="center" width="140"></el-table-column>-->
      <el-table-column label="不含副卡异网" prop="wholeNoSecCardOther" align="center" ></el-table-column>
      <el-table-column label="不含副卡异网占比" prop="wholeNoSecCardOtherPp" align="center"></el-table-column>
<!--      <el-table-column label="不含副卡异网占比排序" prop="wholeNoSecCardOtherPpOrder" align="center" width="170"></el-table-column>-->
      <el-table-column label="当天发展量" prop="sameDay" align="center"></el-table-column>
      <el-table-column label="当日发展不含副卡" prop="sameDayNoSecCard" align="center" ></el-table-column>
      <el-table-column label="当天非副卡占比" prop="sameDayNoSecCardPp" align="center"></el-table-column>
<!--      <el-table-column label="当天非副卡占比排序" prop="sameDayNoSecCardPpOrder" align="center" ></el-table-column>-->
      <el-table-column label="当日发展不含副卡异网" prop="sameDayNoSecCardOther" align="center" ></el-table-column>
      <el-table-column label="当天发展非副卡异网占比" prop="sameDayOtherNoSecCardPp" align="center"></el-table-column>
<!--      <el-table-column label="当天发展非副卡异网占比排名" prop="sameDayOtherNoSecCardPpOrder" align="center"></el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import AutoWidthOption from "@/components/excel/AutoWidthOption";
import BookTypeOption from "@/components/excel/BookTypeOption";
import FilenameOption from "@/components/excel/FilenameOption";
import { querySelfSupportReportWhole } from '@/api/self'
export default {
  name: "wholeDev2Hall",
  components: {
    AutoWidthOption,
    FilenameOption,
    BookTypeOption
  },
  created() {
    this.tableLoading = true
    querySelfSupportReportWhole().then(res => {
      this.list = res.obj
      this.tableLoading = false
    })
  },
  data () {
    return {
      list: [],
      tableLoading: false,
      filename: '',
      autoWidth: '',
      bookType: '',
      downloadLoading: false
    }
  },
  computed: {
    filtersArea() {
      return this.unique(this.list.map(item => {
        return {
          text: item.area,
          value: item.area
        }
      }))
    },
    filtersShopManager() {
      return this.unique(this.list.map(item => {
        return {
          text: item.shopownerName,
          value: item.shopownerName
        }
      }))
    },
    filterChannelName() {
      return this.unique(this.list.map(item => {
        return {
          text: item.channelName,
          value: item.channelName
        }
      }))
    }
  },
  methods: {
    filterMethod(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    unique(arr) {
      for(let i=0; i<arr.length; i++){
        for(let j=i+1; j<arr.length; j++){
          if(arr[i].text==arr[j].text){         //第一个等同于第二个，splice方法删除第二个
            arr.splice(j,1)
            j--
          }
        }
      }
      return arr
    },
    tableCellStyle({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
      if (row.wholeIndexFinishPpOrder < 4 && columnIndex === 6) {
        return 'background-color: rgba(45,224,12,1);'
      }
      if (row.wholeNoSecCardPpOrder < 4 && columnIndex ===8) {
        return 'background-color: rgba(45,224,12,1);'
      }
      if (row.wholeOtherPpOrder < 4 && columnIndex ===10) {
        return 'background-color: rgba(45,224,12,1);'
      }
      if (row.wholeNoSecCardOtherPpOrder < 4 && columnIndex === 12) {
        return 'background-color: rgba(45,224,12,1);'
      }
      if (row.sameDayNoSecCardPpOrder < 4 && columnIndex === 15 ) {
        return 'background-color: rgba(45,224,12,1);'
      }
      if (row.sameDayOtherNoSecCardPpOrder < 4 && columnIndex === 17) {
        return 'background-color: rgba(45,224,12,1);'
      }
      return ''
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['区域', '店长名称', '门店名称', '任务指标', '月整体发展量', '整体指标完成', '指标完成排名', '月整体发展量不含副卡', '不含副卡占比', '不含副卡占比排序', ' 整体异网', '整体异网占比', '整体异网占比排序', '不含副卡异网', '不含副卡异网占比', '不含副卡异网占比排序', '当天发展量 ', '当日发展不含副卡', '当天非副卡占比', '当天非副卡占比排序', '当日发展不含副卡异网', '当天发展非副卡异网占比', '当天发展非副卡异网占比排名']
        const filterVal = ['area', 'shopownerName', 'channelName', 'taskIndexNum', 'wholeDevelop', 'wholeIndexFinishPpContent', 'wholeIndexFinishPpOrder', 'wholeDevelopNoSecCard', 'wholeNoSecCardPp', 'wholeNoSecCardPpOrder', 'wholeOther', 'wholeOtherPp', 'wholeOtherPpOrder', 'wholeNoSecCardOther', 'wholeNoSecCardOtherPp', 'wholeNoSecCardOtherPpOrder', 'sameDay', 'sameDayNoSecCard', 'sameDayNoSecCardPp', 'sameDayNoSecCardPpOrder', 'sameDayNoSecCardOther', 'sameDayOtherNoSecCardPp', 'sameDayOtherNoSecCardPpOrder']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  text-align center
  font-size 25px
  line-height 20px
  font-weight bold
  letter-spacing 2px
  margin 20px auto 20px auto
</style>
