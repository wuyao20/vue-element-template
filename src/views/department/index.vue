<template>
  <div class="app-container">
    <div class="filter-container">
      <label>部门名称：</label>
      <el-input v-model="listQuery.departmentName" placeholder="部门名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-s-custom" @click="createDepart">新建部门</el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.departmentId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.departmentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handleFilter" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="部门名称" prop="departmentName">
          <el-input v-model="temp.departmentName" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import waves from '@/directive/waves' // waves directive
import { departmentQueryAll, createDepartment, updateDepartment, deleteDepartment } from '@/api/department'

export default {
  name: 'Index',
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        departmentName: '',
        page: 1,
        limit: 50,
        sort: '+id'
      },
      textMap: {
        create: '新建部门',
        update: '修改部门信息'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      temp: {},
      rules: {
        departmentName: [{ required: true, message: '部门名称必填' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.handleFilter()
    },
    handleFilter() {
      this.listLoading = true
      departmentQueryAll(this.listQuery).then(res => {
        this.list = res.obj.records
        this.total = this.list.length
        this.listLoading = false
      })
    },
    createDepart() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        departmentName: ''
      }
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    handleDelete(row) {
      const data = Object.assign({}, row)
      data.page = this.listQuery.page
      deleteDepartment(data).then(res => {
        if (res.success === false) {
          this.$notify({
            title: '失败',
            message: res.msg,
            type: 'error',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '成功',
            message: '部门信息删除成功',
            type: 'success',
            duration: 2000
          })
        }
        this.getList()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.page = this.listQuery.page
          createDepartment(this.temp).then(res => {
            this.dialogFormVisible = false
            if (res.success === true) {
              this.$notify({
                title: '成功',
                message: '添加部门成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '失败',
                message: res.msg,
                type: 'error',
                duration: 2000
              })
            }
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.page = this.listQuery.page
          console.log(this.temp)
          updateDepartment(this.temp).then(res => {
            this.dialogFormVisible = false
            if (res.success === false) {
              this.$notify({
                title: '失败',
                message: '部门信息更新失败',
                type: 'error',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '成功',
                message: '部门信息更新成功',
                type: 'success',
                duration: 2000
              })
            }
            this.getList()
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.department
  color red
</style>
