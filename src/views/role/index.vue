<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">角色名称：</label>
      <el-input v-model="listQuery.roleName" placeholder="角色名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit-outline" @click="createRole">新建角色</el-button>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="ID" prop="id" align="center" width="80">
          <template slot-scope="{row}">
            <span>{{ row.roleId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色内容" align="center">
          <template slot-scope="{row}">
            <span>{{ row.roleContent }}</span>
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
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="temp.roleName" />
          </el-form-item>
          <el-form-item label="角色内容" prop="roleContent">
            <el-input type="textarea" autosize v-model="temp.roleContent" />
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
  </div>
</template>

<script>
import { queryAllRole, addRole, updateRole, delRole } from '@/api/roles'
import Pagination from '@/components/Pagination/index'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'Index',
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
      listQuery: {
        roleName: '',
        page: 1,
        limit: 50
      },
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      textMap: {
        create: '添加权限',
        update: '修改权限信息'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      temp: {},
      rules: {
        roleName: [{ required: true, message: '角色名称必填' }],
        roleContent: [{ required: true, message: '角色内容必填' }]
      },
      departments: []
    }
  },
  created() {
    this.handleFilter()
  },
  methods: {
    handleFilter() {
      this.listLoading = true
      queryAllRole(this.listQuery).then(res => {
        this.list = res.obj.records
        this.total = this.list.length
        this.listLoading = false
      })
    },
    createRole() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        roleName: ''
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row, $index) {
      const data = {
        page: this.listQuery.page,
        uuid: row.roleUuid
      }
      delRole(data).then(res => {
        if (res.success) {
          this.$notify.success({
            title: '成功',
            message: '角色删除成功'
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: res.msg
          })
        }
        this.dialogFormVisible = false
        this.handleFilter()
      })
    },
    createData() {
      const data = Object.assign({}, this.temp)
      data.page = this.listQuery.page
      addRole(data).then(res => {
        if (res.success) {
          this.$notify.success({
            title: '成功',
            message: '角色添加成功'
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: res.msg
          })
        }
        this.dialogFormVisible = false
        this.handleFilter()
      })
    },
    updateData() {
      const data = Object.assign({}, this.temp)
      data.page = this.listQuery.page
      updateRole(data).then(res => {
        if (res.success) {
          this.$notify.success({
            title: '成功',
            message: '角色修改成功'
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: res.msg
          })
        }
        this.dialogFormVisible = false
        this.handleFilter()
      })
    }
  }
}
</script>

<style scoped>
</style>
