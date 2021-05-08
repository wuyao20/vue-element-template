<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">模糊信息：</label>
      <el-input v-model="listQuery.content" placeholder="模糊信息" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-user-solid" @click="createUser">新建用户</el-button>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-upload" @click="uploadExcel">批量上传</el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userLoginName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userLoginPassword }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.departmentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="{row}">
          <span>{{ row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限" align="center">
        <template slot-scope="{row}">
          <span>{{ row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据权限" align="center">
        <template slot-scope="scope">
          {{ scope.row.jurisdictionExplain }}
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
        <el-form-item label="账号" prop="userLoginName">
          <el-input v-model="temp.userLoginName" />
        </el-form-item>
        <el-form-item label="密码" prop="userLoginPassword">
          <el-input v-model="temp.userLoginPassword" />
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="temp.userName" />
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="temp.userPhone" />
        </el-form-item>
        <el-form-item label="区域" prop="userArea">
          <el-input v-model="temp.userArea" />
        </el-form-item>
        <el-form-item label="网格" prop="userGrid">
          <el-select v-model="temp.userGrid" style="width: 315px;">
            <el-option v-for="item in grids" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="userJobNumber">
          <el-input v-model="temp.userJobNumber" />
        </el-form-item>
        <el-form-item label="部门" prop="userDepartmentUuid">
          <el-select v-model="temp.userDepartmentUuid" style="width: 310px" placeholder="部门">
            <el-option v-for="item in departments" :key="item.departmentId" :label="item.departmentName" :value="item.departmentUuid" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否在用" prop="userSign">
          <el-select v-model="temp.userSign" style="width: 310px" placeholder="是否在用">
            <el-option v-for="item in sign" :key="item.id" :label="item.msg" :value="item.bool" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="userRoleUuid">
          <el-select v-model="temp.userRoleUuid" style="width: 310px" placeholder="权限">
            <el-option v-for="item in roles" :key="item.roleId" :label="item.roleName" :value="item.roleUuid" />
          </el-select>
        </el-form-item>
        <el-form-item label="查阅权限" prop="userRoleLevel">
          <el-select v-model="temp.userJurisdictionUuid" style="width: 310px" placeholder="查阅权限">
            <el-option v-for="item in levels" :key="item.jurisdictionId" :label="item.jurisdictionExplain" :value="item.jurisdictionUuid" />
          </el-select>
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
    <el-dialog title="批量上传" :visible.sync="dialogUploadVisible">
      <el-upload
        class="upload-demo"
        :action="uploadAction"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :file-list="fileList"
        name="fileContent"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          <el-link type="primary" icon="el-icon-edit" href="http://221.6.211.32:7799/material/userdemo.xlsx" target="_blank">模板文件地址</el-link>
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { queryAllRole, queryAllLevels } from '@/api/roles'
import { selectAllUser, addUser, updateUser, delUser } from '@/api/user'
import { departmentQueryAll } from '@/api/department'
import Pagination from '@/components/Pagination/index'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'Index',
  components: {
    Pagination
  },
  directives: { waves },
  filters: {
    authorityFilter(uuid) {
      const authorities = [
        {
          'jurisdictionId': 1,
          'jurisdictionUuid': '8656dd9c9d8e11ebafaefcb3bc93041c',
          'jurisdictionName': 'personal',
          'jurisdictionExplain': '个人级'
        },
        {
          'jurisdictionId': 2,
          'jurisdictionUuid': 'a7b195939d8e11ebafaefcb3bc93041c',
          'jurisdictionName': 'grid',
          'jurisdictionExplain': '网格级'
        },
        {
          'jurisdictionId': 3,
          'jurisdictionUuid': 'ebefd57a9d8e11ebafaefcb3bc93041c',
          'jurisdictionName': 'line',
          'jurisdictionExplain': '条线级'
        },
        {
          'jurisdictionId': 4,
          'jurisdictionUuid': '195ba0879d8f11ebafaefcb3bc93041c',
          'jurisdictionName': 'leader',
          'jurisdictionExplain': '领导级'
        },
        {
          'jurisdictionId': 5,
          'jurisdictionUuid': '26ddd7d59d8f11ebafaefcb3bc93041c',
          'jurisdictionName': 'admin',
          'jurisdictionExplain': '管理级'
        }
      ]
      console.log(uuid)
      const tempArray = authorities.filter(item => {
        return item.jurisdictionUuid === uuid
      })
      if (tempArray.length === 0) {
        return ''
      } else {
        return tempArray[0].jurisdictionExplain
      }
    }
  },
  data() {
    return {
      dialogUploadVisible: false,
      fileList: [],
      listQuery: {
        content: '', // 模糊查询内容
        userName: '',
        userPhone: '',
        page: 1,
        limit: 50
      },
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      textMap: {
        create: '添加用户',
        update: '修改用户信息'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      temp: {},
      rules: {
        userLoginName: [{ required: true, message: '账号必填' }],
        userLoginPassword: [{ required: true, message: '密码必填' }],
        userName: [{ required: true, message: '姓名必填' }],
        userPhone: [{ required: true, message: '手机号必填' }],
        userArea: [{ required: true, message: '区域必填' }],
        userGrid: [{ required: true, message: '网格必填' }],
        userJobNumber: [{ required: true, message: '工号必填' }],
        userDepartmentUuid: [{ required: true, message: '部门必填', trigger: 'blur' }],
        userSign: [{ required: true, message: '是否在用必填' }],
        userRoleUuid: [{ required: true, message: '权限必填', trigger: 'blur' }]
      },
      departments: [],
      roles: [],
      sign: [
        {
          id: 1,
          msg: '在用',
          bool: true
        },
        {
          id: 2,
          msg: '停用',
          bool: false
        }
      ],
      levels: [],
      grids: ['泉山', '云龙', '鼓楼', '开新', '铜山', '贾汪', '丰县', '沛县', '新沂', '邳州', '睢宁', '市区本部']
    }
  },
  computed: {
    uploadAction() {
      return process.env.VUE_APP_BASE_API + '/files/user/importUserInfo'
    }
  },
  created() {
    queryAllLevels().then(res => {
      this.levels = res
      console.log(this.levels)
    })
    this.handleFilter()
    departmentQueryAll({ page: 1 }).then(res => {
      this.departments = res.obj.records
    })
    queryAllRole({ page: 1 }).then(res => {
      this.roles = res.obj.records
    })
  },
  methods: {
    uploadExcel() {
      this.dialogUploadVisible = true
      this.fileList = []
    },
    handleExceed() {
      this.$notify.error({
        title: 'error',
        message: '只允许单次上传一个文件。。。'
      })
    },
    handleSuccess(res, file) {
      this.fileList.push(file)
      setTimeout(() => {
        this.dialogUploadVisible = false
      }, 2000)
      this.$notify.success({
        title: 'success',
        message: res
      })
    },
    createUser() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        userLoginName: '',
        userLoginPassword: '',
        userName: '',
        userPhone: '',
        userArea: '',
        userGrid: '',
        userJobNumber: '',
        userDepartmentUuid: '',
        userSign: true,
        userRoleUuid: ''
      }
    },
    handleFilter() {
      this.listLoading = true
      selectAllUser(this.listQuery).then(res => {
        console.log(res)
        this.list = res.obj.records
        this.total = this.list.length
        this.listLoading = false
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
    handleDelete(row, $index) {
      console.log($index)
      const data = {
        uuid: row.userRoleUuid,
        page: this.listQuery.page
      }
      delUser(data).then(res => {
        if (res.success) {
          this.$notify.success({
            title: '成功',
            message: '删除用户成功'
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: res.msg
          })
        }
        this.handleFilter()
      })
    },
    createData() {
      addUser(this.temp).then(res => {
        if (res.success) {
          this.$notify.success({
            title: '成功',
            message: '添加用户成功'
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
      this.temp.page = this.listQuery.page
      updateUser(this.temp).then(res => {
        if (res.success) {
          this.$notify.success({
            title: '成功',
            message: '修改用户信息成功'
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: '修改用户信息成功'
          })
        }
        this.dialogFormVisible = false
        this.handleFilter()
      })
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
