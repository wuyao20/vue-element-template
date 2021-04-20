<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">任务名称：</label>
      <el-input v-model="listQuery.quartzName" class="filter-item" clearable placeholder="任务名称" style="width: 300px;" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="btnLoading" @click="handleClick">
        查询
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">
        新建
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="tableLoading"
      fit
      border
      style="width: 100%;"
      :data="list"
      highlight-current-row
    >
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.quartzId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行类" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.quartzType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.quartzName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务组" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.quartzGroup }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务参数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.quartzParam }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间参数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.quartzTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务执行时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.quartzExecuteTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.quartzStatus)">{{ computedStatus(scope.row.quartzStatus) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <div class="btn-container">
            <el-button type="success" size="mini" @click="handleChange(row)">
              修改状态
            </el-button>
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              修改
            </el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :close-on-click-modal="modal" :visible.sync="dialogFormVisible" :title="textMap[dialogStatus]">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 600px; margin-left:50px;"
      >
        <el-form-item label="执行类型" prop="type">
          <el-input v-model="temp.quartzType" />
        </el-form-item>
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="temp.quartzName" />
        </el-form-item>
        <el-form-item label="任务说明" prop="summary">
          <el-input v-model="temp.quartzSummary" />
        </el-form-item>
        <el-form-item label="任务组" prop="group">
          <el-input v-model="temp.quartzGroup" />
        </el-form-item>
        <el-form-item label="任务参数" prop="param">
          <el-input v-model="temp.quartzParam" />
        </el-form-item>
        <el-form-item label="任务时间表达式" prop="time">
          <el-input v-model="temp.quartzTime" />
        </el-form-item>
        <el-form-item label="任务状态" prop="status">
          <el-select v-model="temp.quartzStatus" placeholder="please select">
            <el-option v-for="item in status" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogChangeVisible" title="修改任务状态">
      <el-form
        :model="tempData"
        label-position="left"
        label-width="100px"
        style="width: 600px; margin-left:50px;"
      >
        <el-form-item label="状态">
          <el-radio-group v-model="tempData.quartzStatus">
            <el-radio-button type="success" label="1">启动</el-radio-button>
            <el-radio-button type="info" label="2">挂起</el-radio-button>
            <el-radio-button type="warning" label="3">恢复</el-radio-button>
            <el-radio-button type="danger" label="4">停止</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChangeVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="changeState">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryAllQuartz, ChangeQuartz, AddQuartz, DelQuartz, changeQuartzState } from '@/api/task'

export default {
  name: 'Task',
  data() {
    return {
      modal: false,
      tempData: {},
      dialogChangeVisible: false,
      tableKey: 0,
      listQuery: {
        quartzName: ''
      },
      btnLoading: false,
      list: [],
      tableLoading: false,
      dialogFormVisible: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogStatus: '',
      status: [
        {
          key: 1,
          value: '启动'
        },
        {
          key: 2,
          value: '挂起'
        },
        {
          key: 3,
          value: '恢复'
        },
        {
          key: 4,
          value: '停止'
        }
      ],
      rules: {
        type: [{
          required: true,
          message: 'type is required'
        }],
        name: [{
          required: true,
          message: 'name is required'
        }],
        summary: [{
          required: true,
          message: 'summary is required'
        }],
        group: [{
          required: true,
          message: 'group is required'
        }],
        param: [{
          required: true,
          message: 'param is required'
        }],
        time: [{
          required: true,
          message: 'time is required'
        }],
        status: [{
          required: true,
          message: 'status is required'
        }]
      },
      temp: {}
    }
  },
  created() {
    this.handleClick()
  },
  methods: {
    changeState() {
      changeQuartzState({
        uuid: this.tempData.quartzUuid,
        state: this.tempData.quartzStatus
      }).then(res => {
        if (res.success) {
          this.$notify.success({
            title: 'success',
            message: '修改状态成功'
          })
        }
        this.handleClick()
        this.dialogChangeVisible = false
      })
    },
    handleChange(row) {
      this.dialogChangeVisible = true
      this.tempData = Object.assign({}, row)
    },
    handleDelete(row) {
      DelQuartz({ uuid: row.quartzUuid }).then(res => {
        this.$notify.success({
          title: 'success',
          message: res.msg
        })
        this.handleClick()
      })
    },
    tagType(status) {
      switch (status) {
        case 1:
          return 'success'
        case 2:
          return 'info'
        case 3:
          return 'warning'
        case 4:
          return 'danger'
        default:
          return 'danger'
      }
    },
    computedStatus(status) {
      const result = this.status.map(item => {
        if (item.key === status) {
          return item.value
        }
      })
      this.removeEmptyArrayEle(result)
      return result[0]
    },
    createData() {
      AddQuartz(this.temp).then(res => {
        this.$notify.success({
          title: 'success',
          message: res.message
        })
        this.handleClick()
        this.dialogFormVisible = false
      })
    },
    resetTemp() {
      this.temp = {}
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    updateData() {
      ChangeQuartz(this.temp).then(res => {
        this.$notify.success({
          title: 'success',
          message: res
        })
        this.dialogFormVisible = false
        this.handleClick()
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    handleClick() {
      this.loadingTrue()
      queryAllQuartz(this.listQuery).then(res => {
        this.list = res.msg
        this.loadingFalse()
      })
    },
    loadingFalse() {
      this.tableLoading = false
      this.btnLoading = false
    },
    loadingTrue() {
      this.btnLoading = true
      this.tableLoading = true
    },
    removeEmptyArrayEle(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === undefined) {
          arr.splice(i, 1)
          i = i - 1 // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
          // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
        }
      }
      return arr
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn-container
  display flex
  flex-direction row
  flex-flow nowrap
  justify-content center
</style>
