<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">
        文件标志：
      </label>
      <el-input class="filter-item" style="width: 150px;" v-model="listQuery.outputFileTarget" placeholder="文件标志"></el-input>
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
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleClick">生成文件</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleFilter">查询文件</el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      fit
      border
      highlight-current-row
      style="width: 100%;"
      :data="list"
    >
      <el-table-column label="ID" prop="outputId" width="80" align="center"></el-table-column>
      <el-table-column label="标识" prop="outputFileTarget" align="center"></el-table-column>
      <el-table-column label="文件路径" align="center" show-tooltip-when-overflow>
        <template slot-scope="scope">
          <el-link type="primary" :href="scope.row.outputFilePath">{{scope.row.outputFilePath}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="起始时间" prop="outputStartTime" align="center"></el-table-column>
      <el-table-column label="结束时间" prop="outputEndTime" align="center"></el-table-column>
      <el-table-column label="Action" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handleFilter"></pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { noActiveDownloadFile, noActiveDownloadFilePage, noActiveDownloadDeleteFile } from "@/api/public"

export default {
  name: "NoActive",
  components: {
    Pagination
  },
  data () {
    return {
      listQuery: {
        outputFileTarget: '',
        outputStartTime: '',
        outputEndTime: '',
        page: 1,
        limit: 20
      },
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
      total: 0,
      date: [],
      list: [],
      tableLoading: false
    }
  },
  created() {
    this.handleFilter()
  },
  methods: {
    handleDelete(row) {
      noActiveDownloadDeleteFile(row).then(res => {
        this.$notify.success({
          title: 'success',
          message: res
        })
        this.handleFilter()
      })
    },
    handleFilter() {
      this.tableLoading = true
      noActiveDownloadFilePage(this.listQuery).then(res => {
        this.list = res.obj.records
        this.tableLoading = false
      })
    },
    handleClick() {
      if (this.date === null) {
        this.listQuery.outputStartTime = ''
        this.listQuery.outputEndTime = ''
      } else {
        this.listQuery.outputStartTime = this.date[0]
        this.listQuery.outputEndTime = this.date[1]
      }
      noActiveDownloadFile(this.listQuery).then(res => {
        const { msg, success } = res
        if(success) {
          this.$notify.success({
            title: 'success',
            message: msg
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
