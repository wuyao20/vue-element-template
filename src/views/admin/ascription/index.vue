<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">查询：</label>
      <el-input v-model="listQuery.uuid" class="filter-item" style="width: 200px;" clearable />
      <el-button type="primary" icon="el-icon-search" class="filter-item" @click="handleFilter">查询</el-button>
      <el-button type="primary" icon="el-icon-user" class="filter-item" @click="handleCreate">新建条线</el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      fit
      border
      highlight-current-row
      :data="list"
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="ascriptionId" align="center" />
      <el-table-column label="名称" prop="ascriptionName" align="center" />
      <el-table-column label="createTime" prop="createTime" align="center" />
      <el-table-column label="updateTime" prop="updateTime" align="center" />
      <el-table-column label="action" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleUpdate(scope.row)">update</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" :pagination="handleFilter" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100" style="width: 600px;">
        <el-form-item label="条线名称" prop="ascriptionName">
          <el-input v-model="temp.ascriptionName" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">cancel</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addAscription, ascriptionAll, deleteAscription, updateAscription } from '@/api/public'
import Pagination from '@/components/Pagination'
export default {
  name: 'Ascription',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        uuid: undefined,
        page: 1,
        limit: 50
      },
      list: [],
      total: 0,
      textMap: {
        'create': '新建条线数据',
        'update': '更新条线数据'
      },
      dialogFormVisible: false,
      dialogStatus: 'create',
      temp: {},
      rules: {
        ascriptionName: [
          { required: true, message: '内容必填', trigger: 'blur' }
        ]
      },
      tableLoading: false
    }
  },
  created() {
    ascriptionAll().then(res => {
      const { success, obj } = res
      if (success) {
        this.list = obj
        this.total = obj.length
      } else {
        this.$message.error({
          message: '获取条线数据失败，请刷新重试。。。'
        })
      }
    })
  },
  methods: {
    handleFilter() {
      this.tableLoading = true
      ascriptionAll().then(res => {
        const { success, obj } = res
        if (success) {
          this.list = obj
          this.total = obj.length
          this.tableLoading = false
        } else {
          this.$message.error({
            message: '获取条线数据失败，请刷新重试。。。'
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          updateAscription(this.temp).then(res => {
            const { msg, success } = res
            if (success) {
              this.$notify.success({
                title: 'success',
                message: msg
              })
              this.handleFilter()
              this.dialogFormVisible = false
            }
          })
        }
      })
    },
    handleDelete(row) {
      deleteAscription(row.ascriptionUuid).then(res => {
        const { msg, success } = res
        if (success) {
          this.$notify.success({
            title: 'success',
            message: msg
          })
          this.handleFilter()
          this.dialogFormVisible = false
        }
      })
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.temp = {
        ascriptionName: ''
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          addAscription(this.temp).then(res => {
            const { msg, success } = res
            if (success) {
              this.$notify.success({
                title: 'success',
                message: msg
              })
              this.handleFilter()
              this.dialogFormVisible = false
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
