<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">
        模糊查询:
      </label>
      <el-input class="filter-item" style="width: 200px;" v-model="listQuery.content" placeholder="模糊查询"></el-input>
      <el-button type="primary" class="filter-item" :loading="btnLoading" icon="el-icon-search" @click="handleFilter">search</el-button>
      <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="handleCreate">Create</el-button>
    </div>
    <el-table
      v-loading="tableLoading"
      border
      fit
      highlight-current-row
      :data="list"
      style="width: 100%;"
    >
      <el-table-column label="ID" align="center" width="70">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="渠道名称" align="center" prop="middleChannelName"></el-table-column>
      <el-table-column label="渠道编码" align="center" prop="middleChannelId"></el-table-column>
      <el-table-column label="归属自有门店" align="center" prop="middleHomeStore"></el-table-column>
      <el-table-column label="归属门店编码" align="center" prop="middleHomeId"></el-table-column>
      <el-table-column label="片区" align="center" prop="middleArea"></el-table-column>
      <el-table-column label="店长" align="center" prop="middleShopownerName"></el-table-column>
      <el-table-column label="归属网格" align="center" prop="middleGrid"></el-table-column>
      <el-table-column label="Action" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handlePage" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 500px; margin-left:50px;">
        <el-form-item label="渠道名称" prop="middleChannelName">
          <el-input v-model="temp.middleChannelName"></el-input>
        </el-form-item>
        <el-form-item label="渠道编码" prop="middleChannelName">
          <el-input v-model="temp.middleChannelId"></el-input>
        </el-form-item>
        <el-form-item label="归属自有门店" prop="middleChannelName">
          <el-input v-model="temp.middleHomeStore"></el-input>
        </el-form-item>
        <el-form-item label="归属门店编码" prop="middleChannelName">
          <el-input v-model="temp.middleHomeId"></el-input>
        </el-form-item>
        <el-form-item label="片区" prop="middleChannelName">
          <el-input v-model="temp.middleArea"></el-input>
        </el-form-item>
        <el-form-item label="店长姓名" prop="middleChannelName">
          <el-input v-model="temp.middleShopownerName"></el-input>
        </el-form-item>
        <el-form-item label="归属网格" prop="middleChannelName">
          <el-input v-model="temp.middleGrid"></el-input>
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
import { queryAllTarget, addMiddle, updateMiddle, deleteMiddle, queryMiddleByPage } from '@/api/self'
import Pagination from '@/components/Pagination/index'

export default {
  name: 'Target',
  components: {
    Pagination
  },
  data () {
    return {
      listQuery: {
        content: '',
        page: 1,
        limit: 50
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
        middleChannelName: [{ required: true, message: '内容必填' }],
        middleChannelId: [{ required: true, message: '内容必填' }],
        middleHomeStore: [{ required: true, message: '内容必填' }],
        middleHomeId: [{ required: true, message: '内容必填' }],
        middleArea: [{ required: true, message: '内容必填' }],
        middleShopownerName: [{ required: true, message: '内容必填' }],
        middleGrid: [{ required: true, message: '内容必填' }]
      }
    }
  },
  created() {
    this.handlePage()
  },
  methods: {
    handlePage() {
      queryMiddleByPage(this.listQuery.page).then(res => {
        this.list = res.obj.records
        this.total = this.list.length
      })
    },
    handleDelete(row) {
      deleteMiddle(row.middleUuid).then(res => {
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
      this.handlePage()
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleFilter() {
      this.btnLoading = true
      this.tableLoading = true
      queryAllTarget(this.listQuery.content).then(res => {
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
    resetTemp() {
      this.temp= {
        middleChannelName: "", //渠道名称
        middleChannelId: "",  //7位渠道编码
        middleHomeStore: "",  //归属自有门店
        middleHomeId: "",  //归属门店编码
        middleArea: "",	   //片区
        middleShopownerName: "",  //店长姓名
        middleGrid: ""  //归属网格
      }
    },
    createData() {
      this.$refs.dataForm.validate(valid => {
        if(valid) {
          addMiddle(this.temp).then(res => {
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
          updateMiddle(this.temp).then(res => {
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
    }
  }
}
</script>

<style lang='stylus' scoped>

</style>
