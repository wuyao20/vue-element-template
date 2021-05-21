<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">模糊查询：</label>
      <el-input v-model="listQuery.content" class="filter-item" style="width: 200px;" />
      <el-button v-waves type="primary" icon="el-icon-search" class="filter-item" @click="handleSearch">查询</el-button>
      <el-button v-waves type="primary" icon="el-icon-person" class="filter-item" @click="handleCreate">新建</el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      fit
      border
      highlight-current-row
      :data="list"
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="courierId" align="center" />
      <el-table-column label="配送人员电话" prop="courierTel" align="center" />
      <el-table-column label="区域" prop="courierArea" align="center" />
      <el-table-column label="类型" prop="courierType" align="center" />
      <el-table-column label="网格" prop="courierGrid" align="center" />
      <el-table-column label="乡镇" prop="courierTown" align="center" />
      <el-table-column label="是否薄弱" prop="courierWeak" align="center">
        <template slot-scope="scope">
          {{ scope.row.courierWeak | weakFilter }}
        </template>
      </el-table-column>
      <el-table-column label="配送范围" prop="courierRange" align="center" />
      <el-table-column label="合作厅名称" prop="courierCoopName" align="center" />
      <el-table-column label="发展人" prop="courierDevelopPerson" align="center" />
      <el-table-column label="发展人编码msg" prop="courierDevelopMsg" align="center" />
      <el-table-column label="发展人编码" prop="courierDevelopCode" align="center" />
      <el-table-column label="发展人编码新" prop="courierDevelopCodeNew" align="center" />
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleUpdate(scope.row)">更新</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handleFilter" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="temp" label-position="left" label-width="120px" style="width: 500px; margin-left: 20px;">
        <el-form-item label="配送人员电话" prop="courierTel">
          <el-input v-model="temp.courierTel" clearable />
        </el-form-item>
        <el-form-item label="区域" prop="courierArea">
          <el-input v-model="temp.courierArea" clearable />
        </el-form-item>
        <el-form-item label="类型" prop="courierType">
          <el-input v-model="temp.courierType" clearable />
        </el-form-item>
        <el-form-item label="网格" prop="courierGrid">
          <el-input v-model="temp.courierGrid" clearable />
        </el-form-item>
        <el-form-item label="乡镇" prop="courierTown">
          <el-input v-model="temp.courierTown" clearable />
        </el-form-item>
        <el-form-item label="是否薄弱" prop="courierWeak">
          <el-select v-model="temp.courierWeak" style="width: 380px;">
            <el-option v-for="item in weaks" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="配送范围" prop="courierRange">
          <el-input v-model="temp.courierRange" clearable />
        </el-form-item>
        <el-form-item label="合作厅名称" prop="courierCoopName">
          <el-input v-model="temp.courierCoopName" clearable />
        </el-form-item>
        <el-form-item label="发展人" prop="courierDevelopPerson">
          <el-input v-model="temp.courierDevelopPerson" clearable />
        </el-form-item>
        <el-form-item label="发展人编码msg" prop="courierDevelopMsg">
          <el-input v-model="temp.courierDevelopMsg" clearable />
        </el-form-item>
        <el-form-item label="发展人编码" prop="courierDevelopCode">
          <el-input v-model="temp.courierDevelopCode" clearable />
        </el-form-item>
        <el-form-item label="发展人编码新" prop="courierDevelopCodeNew">
          <el-input v-model="temp.courierDevelopCodeNew" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryAllDeliveryByPage, queryAllDeliveryByPageAndContent, deliveryUpdate, deliveryCreate, deliveryDelete } from '@/api/commerce'
import waves from '@/directive/waves/waves'
import Pagination from '@/components/Pagination'
export default {
  name: 'Delivery',
  directives: {
    waves
  },
  components: {
    Pagination
  },
  filters: {
    weakFilter(val) {
      if (val === '0') {
        return '不薄弱'
      } else if (val === '1') {
        return '薄弱'
      } else {
        return '暂无对应'
      }
    }
  },
  data() {
    return {
      listQuery: {
        content: '',
        page: 1,
        limit: 50
      },
      total: 0,
      list: [],
      tableLoading: false,
      dialogFormVisible: false,
      textMap: {
        'create': '新建配送员信息',
        'update': '更新配送员信息'
      },
      dialogStatus: 'create',
      temp: {},
      weaks: [
        { key: '0', value: '不薄弱' },
        { key: '1', value: '薄弱' }
      ]
    }
  },
  created() {
    queryAllDeliveryByPage(this.listQuery).then(res => {
      this.list = res.obj.records
    })
  },
  methods: {
    handleSearch() {
      this.tableLoading = true
      queryAllDeliveryByPageAndContent(this.listQuery).then(res => {
        this.list = res.obj.records
        this.total = this.list.length
        setTimeout(() => { this.tableLoading = false }, 1000)
      })
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.temp = {
        'courierUuid': '',
        'courierTel': '',
        'courierArea': '',
        'courierType': '',
        'courierGrid': '',
        'courierTown': '',
        'courierWeak': '0',
        'courierRange': '',
        'courierCoopName': '',
        'courierDevelopPerson': '',
        'courierDevelopMsg': '',
        'courierDevelopCode': '',
        'courierDevelopCodeNew': ''
      }
    },
    createData() {
      deliveryCreate(this.temp).then(res => {
        const { msg, success } = res
        if (success) {
          this.$notify.success({
            title: 'success',
            message: msg
          })
        }
      })
      this.handleFilter()
      this.dialogFormVisible = false
    },
    handleUpdate(row) {
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      this.temp = Object.assign({}, row)
    },
    updateData() {
      deliveryUpdate(this.temp).then(res => {
        const { msg, success } = res
        if (success) {
          this.$notify.success({
            title: 'success',
            message: msg
          })
        }
      })
      this.dialogFormVisible = false
      this.handleFilter()
    },
    handleDelete(row) {
      deliveryDelete(row).then(res => {
        const { msg, success } = res
        if (success) {
          this.$notify.success({
            title: 'success',
            message: msg
          })
        }
      })
      this.handleFilter()
    },
    handleFilter() {
      queryAllDeliveryByPage(this.listQuery).then(res => {
        this.list = res.obj.records
        this.total = this.list.length
      })
    }
  }
}
</script>

<style scoped>

</style>
