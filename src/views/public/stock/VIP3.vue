<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">用户电话号码：</label>
      <el-input class="filter-item" style="width: 200px;" v-model="listQuery.userPhone" placeholder="用户电话号码" clearable></el-input>
      <el-button type="primary" v-waves class="filter-item" :loading="btnLoading" icon="el-icon-search" @click="BtnSearch">Search</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload" @click="handleUpload">上传</el-button>
     </div>
    <div class="title">VIP3宽带融合</div>
    <el-table
      v-loading="tableLoading"
      fit
      border
      highlight-current-row
      :data="list"
      style="width: 100%;"
    >
      <el-table-column prop="id" label="id" align="center" width="70"></el-table-column>
      <el-table-column prop="deviceNumber" label="移网账号" align="center"></el-table-column>
      <el-table-column prop="deviceNumberKd" label="宽带账号" align="center"></el-table-column>
      <el-table-column prop="acceptDate" label="受理日期" align="center"></el-table-column>
      <el-table-column prop="shareAddress" label="虚拟地址" show-tooltip-when-overflow align="center"></el-table-column>
      <el-table-column prop="kdAddress" label="系统地址" show-tooltip-when-overflow align="center"></el-table-column>
      <el-table-column prop="userStatus" label="用户状态" align="center"></el-table-column>
      <el-table-column prop="customerServiceId" label="vip客服经理工号" align="center"></el-table-column>
      <el-table-column prop="customerServiceName" label="客服" align="center"></el-table-column>
      <el-table-column prop="feedbackNum" label="回访次数" align="center"></el-table-column>
      <el-table-column prop="visitDate" label="回访日期" align="center">
        <template slot-scope="scope">
          {{scope.row.visitDate}}
        </template>
      </el-table-column>
      <el-table-column prop="returnVisit" label="最新内容" align="center"></el-table-column>
<!--      <el-table-column prop="returnVisit" label="回访记录" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          {{scope.row.returnVisit}}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <el-button v-waves size="small" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-waves size="small" type="danger" @click="handleUpdateService(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handleFilter" />
    <el-dialog title="回访记录编辑" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 600px; margin-left: 50px;">
        <el-form-item label="是否接通">
          <el-radio-group v-model="temp.connected">
            <el-radio label="已接通">已接通</el-radio>
            <el-radio label="未接通">未接通</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否装机">
          <el-radio-group v-model="temp.installed">
            <el-radio label="已装机">已装机</el-radio>
            <el-radio label="未装机">未装机</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="回访备注" prop="returnVisit">
          <el-input v-model="temp.activeRemarks" type="textarea" autosize></el-input>
        </el-form-item>
      </el-form>
      <el-table
        fit
        border
        highlight-current-row
        :data="visitedList"
        style="width: 100%;"
      >
        <el-table-column prop="id" align="center" label="ID"></el-table-column>
        <el-table-column prop="userName" align="center" label="用户名"></el-table-column>
        <el-table-column prop="activeContent" align="center" label="登记信息"></el-table-column>
        <el-table-column prop="activeRemarks" align="center" label="备注"></el-table-column>
        <el-table-column prop="activeCreatTime" show-tooltip-when-overflow align="center" label="时间"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" @click="handleUpdateItem(row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="修改记录"
        :visible.sync="innerDialogVisible"
        width="60%"
        append-to-body
      >
        <el-form v-model="innerTemp" label-position="left" label-width="90px" style="width: 400px; margin-left: 50px;">
          <el-form-item label="回访记录">
            <el-input v-model="innerTemp.activeContent"></el-input>
          </el-form-item>
          <el-form-item label="回访备注">
            <el-input v-model="innerTemp.activeRemarks"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="innerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateItem">确认</el-button>
        </div>
      </el-dialog>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="上传VIP3办理宽带明细" :visible.sync="dialogUploadVisible">
      <el-upload
        style="width: 100%; text-align: center;"
        drag
        :action="uploadAction"
        :limit="1"
        :file-list="fileList"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        name="fileContent"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">单次只允许上传一个文件</div>
      </el-upload>
    </el-dialog>
    <el-dialog title="修改客服经理" :visible.sync="servicesDialogVisible">
      <el-form :model="serviceTemp" label-position="left" label-width="150" style="width: 600px;">
        <el-form-item label="移网账号">
          <el-input disabled v-model="serviceTemp.deviceNumber"></el-input>
        </el-form-item>
        <el-form-item label="宽带账号">
          <el-input disabled v-model="serviceTemp.deviceNumberKd"></el-input>
        </el-form-item>
        <el-form-item label="客服">
          <el-select clearable filterable v-model="serviceTemp.customerServiceId">
            <el-option v-for="item in services" :key="item.userJobNumber" :label="item.userName" :value="item.userJobNumber"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="servicesDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="updateService">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateInnerItem, getVisitedList, vip3QueryAllTarget, vip3QueryAllTargetByPhone, updateVisit, vip3AllService, vip3UpdateService } from "@/api/public"
import waves from "@/directive/waves/waves"
import Pagination from '@/components/Pagination'
export default {
  name: "VIP3",
  data() {
    return {
      innerDialogVisible: false,
      innerTemp: {},
      dialogUploadVisible: false,
      temp: {},
      dialogFormVisible: false,
      list: [],
      listQuery: {
        userPhone: '',
        page: 1,
        limit: 50
      },
      tableLoading: false,
      btnLoading: false,
      fileList: [],
      total: 0,
      services: [],
      servicesDialogVisible: false,
      serviceTemp: {},
      visitedList: [],
      userId: ''
    }
  },
  components: {
    Pagination
  },
  directives: {
    waves
  },
  created() {
    vip3QueryAllTarget(this.listQuery).then(res => {
      this.list = res.obj.records
      this.total = res.obj.total
    })
    vip3AllService().then(res => {
      const { obj } = res
      this.services = obj
    })
  },
  methods: {
    updateItem() {
      const params = {
        id: this.innerTemp.activeId,
        data: {
          activeContent: this.innerTemp.activeContent,
          activeRemarks: this.innerTemp.activeRemarks
        }
      }
      updateInnerItem(params).then(res => {
        getVisitedList(this.userId).then(res => {
          const { obj } = res
          this.visitedList = obj
          const { msg, success } = res
          this.$notify.success({
            title: 'success',
            message: msg
          })
          this.innerDialogVisible = false
        })
      })
    },
    handleUpdateItem(row) {
      this.innerTemp = Object.assign({}, row)
      this.innerDialogVisible = true
    },
    handleUpdateService(row) {
      this.servicesDialogVisible = true
      this.serviceTemp = Object.assign({}, row)
    },
    updateService() {
      const result = {
        userNo: this.serviceTemp.userNo,
        jobNumber: this.serviceTemp.customerServiceId
      }
      vip3UpdateService(result).then(res => {
        const { msg, success } = res
        if(success) {
          this.$notify.success({
            title: 'success',
            message: msg
          })
        }
        this.handleFilter()
        this.servicesDialogVisible = false
      })
    },

    handleFilter() {
      this._handleSearch()
    },
    _handleSearch() {
      vip3QueryAllTarget(this.listQuery).then(res => {
        this.list = res.obj.records
        this.total = res.obj.total
        this.$forceUpdate()
      })
    },
    BtnSearch() {
      this.tableLoading = true
      this.btnLoading = true
      vip3QueryAllTargetByPhone(this.listQuery).then(res => {
        this.list = res.obj.records
        this.total = res.obj.total
        this.$forceUpdate()
        this.tableLoading = false
        this.btnLoading = false
      })
    },

    handleUpdate(row) {
      this.userId = row.id
      getVisitedList(row.id).then(res => {
        const { obj } = res
        this.visitedList = obj
        this.temp = {}
        this.dialogFormVisible = true
      })
    },
    updateData() {
      const params = {
        activeContent: this.temp.connected + '|' + this.temp.installed,
        activeRemarks: this.temp.activeRemarks
      }
      updateVisit(params).then(res => {
        this.$notify.success({
          title: 'success',
          message: res.msg
        })
        this._handleSearch()
        this.dialogFormVisible = false
      })
    },

    handleUpload() {
      this.fileList = []
      this.dialogUploadVisible = true
    },
    handleExceed() {
      this.$notify.error({
        title: 'error',
        message: '单次上传只允许上传一个文件'
      })
    },
    handleSuccess(response, file, fileList) {
      this.$notify.success({
        title: 'success',
        message: response
      })
      setTimeout(() => {
        this.dialogUploadVisible = false
      }, 1000)
    }
  },
  computed: {
    uploadAction() {
      return process.env.VUE_APP_BASE_API + '/tempActive/vip3/uploadFile'
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  font-size 20px
  line-height 20px
  font-weight bold
  letter-spacing 1px
  text-align center
  letter-spacing 1px
  margin-top 10px
  margin-bottom 10px
</style>
