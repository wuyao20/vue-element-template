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
      tableLoading: false
    }
  },
  created() {
    this.tableLoading = true
    commerceThatDayDev().then(res => {
      this.list = res.obj
      setTimeout(() => {
        this.tableLoading = false
      }, 1000)
    })
  },
  methods: {
    percentSort(a, b) {
      return parseFloat(/\d+\.\d+/.exec(a.conversionRate)) - parseFloat(/\d+\.\d+/.exec(b.conversionRate))
    },
    percentHundredSort(a, b) {
      return parseFloat(/\d+\.\d+/.exec(a.hundredConversionRate)) - parseFloat(/\d+\.\d+/.exec(b.hundredConversionRate))
    }
  }
}
</script>

<style scoped>

</style>
