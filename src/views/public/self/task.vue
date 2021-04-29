<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">
        模糊查询:
      </label>
      <el-input class="filter-item" style="width: 200px;" v-model="listQuery.content" placeholder="模糊查询"></el-input>
      <el-button type="primary" class="filter-item" :loading="btnLoading" icon="el-icon-search" @click="handleFilter">search</el-button>
      <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="handleCreate">Create</el-button>
      <el-button type="danger" class="filter-item" icon="el-icon-delete" @click="handleDelete">Delete</el-button>
      <el-link class="filter-item" type="primary" href="http://221.6.211.32:7799/material/selftask.xlsx"><el-button type="success" icon="el-icon-edit">模板文件地址</el-button></el-link>
    </div>
    <div class="filter-container">
      <label class="filter-item">当前锁：{{lockName}}</label>
      <el-button type="warning" class="filter-item" @click="handleLock"><svg-icon icon-class="lock" />修改锁</el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      border
      fit
      highlight-current-row
      :data="list"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="ID" align="center" width="70">
        <template slot-scope="scope">
          {{ scope.row.taskId }}
        </template>
      </el-table-column>
      <el-table-column label="指标名称" align="center" prop="taskIndexName"></el-table-column>
      <el-table-column label="营业厅" align="center" prop="taskRelevantOffice"></el-table-column>
      <el-table-column label="任务量" align="center" prop="taskIndexNum"></el-table-column>
      <el-table-column label="添加日期" align="center" prop="taskAddDate"></el-table-column>
      <el-table-column label="Action" align="center" width="100">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleUpdate(scope.row)">修改</el-button>
<!--          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handlePage" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 500px; margin-left:50px;">
        <el-form-item label="新增指标" prop="taskIndexName">
          <el-input v-model="temp.taskIndexName"></el-input>
        </el-form-item>
        <el-form-item label="对应营业厅" prop="taskRelevantOffice">
          <el-input v-model="temp.taskRelevantOffice"></el-input>
        </el-form-item>
        <el-form-item label="任务量" prop="taskIndexNum">
          <el-input v-model="temp.taskIndexNum"></el-input>
        </el-form-item>
        <el-form-item label="添加时间" prop="taskAddDate">
          <el-date-picker
            v-model="temp.taskAddDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyyMMdd"
          >
          </el-date-picker>
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
    <el-dialog title="修改锁" :visible.sync="dialogLockVisible">
      <el-form ref="lockForm" :model="lockTemp" label-position="left" label-width="120px" style="width: 500px; margin-left: 50px;">
        <el-form-item label="锁列表">
          <el-select v-model="lockTemp.content">
            <el-option v-for="item in locks" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogLockVisible = false">cancel</el-button>
        <el-button type="primary" @click="updateLock">confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addTaskIndex, deleteTaskIndex, queryTaskIndex, queryTaskIndexByPage, updateTaskIndex, getLockName, queryGroupList, updateLock } from "@/api/self"
import Pagination from '@/components/Pagination'

export default {
  name: "Task",
  components: {
    Pagination
  },
  data () {
    return {
      locks: [],
      lockTemp: {
        content: ''
      },
      lockName: '',
      dialogLockVisible: false,
      listQuery: {
        content: '',
        page: 1,
        limit: 20
      },
      total: 0,
      btnLoading: false,
      tableLoading: false,
      list: [],
      textMap: {
        create: 'create',
        update: 'update'
      },
      dialogFormVisible: false,
      temp: {},
      dialogStatus: 'create',
      rules: {
        taskIndexName: [{ required: true, message: '内容必填' }],
        taskRelevantOffice: [{ required: true, message: '内容必填' }],
        taskIndexNum: [{ required: true, message: '内容必填' }],
        taskAddDate: [{ required: true, message: '内容必填' }]
      },
      multipleSelection: []
    }
  },
  created() {
    this.handlePage()
    getLockName().then(res => {
      const { obj } = res
      this.lockName = obj
    })
    queryGroupList().then(res => {
      this.locks = res.obj
    })
  },
  methods: {
    updateLock() {
      updateLock(this.lockTemp.content).then(res => {
        const { msg, success } = res
        if(success) {
          this.$notify.success({
            title: 'success',
            message: msg
          })
        }
        this.dialogLockVisible = false
        this.handlePage()
      })
    },
    handleLock() {
      this.dialogLockVisible = true
    },
    handlePage() {
      queryTaskIndexByPage(this.listQuery.page).then(res => {
        this.list = res.obj.records
        this.total = this.list.length
      })
    },
    handleFilter() {
      this.btnLoading = true
      this.tableLoading = true
      queryTaskIndex(this.listQuery.content).then(res => {
        this.list = res.obj
        this.total = this.list.length
        this.btnLoading = false
        this.tableLoading = false
      })
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.dialogStatus = 'create',
      this.resetTemp()
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete() {
      if(this.multipleSelection.length > 0) {
        deleteTaskIndex({taskIndexUuids: this.multipleSelection}).then(res => {
          const { msg, success } = res
          if(success) {
            this.$notify.success({
              title: 'success',
              message: msg
            })
          } else {
            this.$notify.error({
              title: 'error',
              message: msg
            })
          }
        })
        this.handleFilter()
      } else {
        this.$notify.error({
          title: 'error',
          message: '请选中之后,再删除...'
        })
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp= {
        taskIndexName: "",
        taskRelevantOffice: "",
        taskIndexNum: "",
        taskAddDate: ""
      }
    },
    createData() {
      this.$refs.dataForm.validate(valid => {
        if(valid) {
          addTaskIndex(this.temp).then(res => {
            const { msg, success } = res
            if(success === true) {
              this.$notify.success({
                title: 'success',
                message: msg
              })
            }
            this.dialogFormVisible = false
            this.handleFilter()
          })
        }
      })
    },
    updateData() {
      this.$refs.dataForm.validate(valid => {
        if(valid) {
          updateTaskIndex(this.temp).then(res => {
            const { msg, success} = res
            if(success) {
              this.$notify.success({
                title: 'success',
                message: msg
              })
            } else {
              this.$notify.error({
                title: 'error',
                message: msg
              })
            }
          })
        }
        this.dialogFormVisible = false
        this.handleFilter()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => item.taskUuid)
    }
  }
}
</script>

<style scoped>

</style>
