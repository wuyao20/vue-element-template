<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="filter-item">模块名称：</label>
      <el-input v-model="listQuery.modularName" clearable style="width: 200px;" class="filter-item" />
      <el-button :loading="btnLoading" class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
        search
      </el-button>
      <el-button :loading="uploadLoading" class="filter-item" type="primary" icon="el-icon-upload" @click="handleUpload">
        upload
      </el-button>
      <el-table
        v-loading="tableLoading"
        fit
        border
        highlight-current-row
        :data="list"
        style="width: 100%;"
      >
        <el-table-column label="ID" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.fileId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文件名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文件大小" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fileMaxSize }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文件保存路径" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fileSavePath }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否导入" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fileImportWhether }}</span>
          </template>
        </el-table-column>
        <el-table-column label="模块名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fileModularName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="createTime" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="updateTime" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="btn-container">
              <el-button type="primary" size="small" icon="el-icon-upload" @click="fileUpload(scope.row.fileUuid)">数据库</el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="fileDelete(scope.row.fileUuid)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :visible.sync="dialogFormVisible"
        title="upload"
        style="width: 100%;"
        :close-on-click-modal="modal"
      >
        <div class="filter-container" style="margin-bottom: 20px;">
          <label class="filter-item">模块名称：</label>
          <el-radio-group v-model="temp.modularName" class="filter-item">
            <el-radio-button label="onlineReport">电商模块</el-radio-button>
            <el-radio-button label="societyReport">社会渠道模块</el-radio-button>
            <el-radio-button label="selfSupportReport">自营模块</el-radio-button>
            <el-radio-button label="commonReport">通用模块</el-radio-button>
          </el-radio-group>
        </div>
        <el-upload
          :action="uploadAction"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          name="fileContent"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传单个文件</div>
        </el-upload>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { queryAllFiles, fileUploadDatabase, fileDelete } from '@/api/upload'
const baseUrl = process.env.VUE_APP_BASE_API
export default {
  name: 'Upload',
  data() {
    return {
      btnLoading: false,
      uploadLoading: false,
      listQuery: {
        modularName: '',
        page: 1,
        size: 20
      },
      tableLoading: false,
      list: [],
      dialogFormVisible: false,
      modal: false,
      temp: {
        modularName: 'onlineReport'
      },
      fileList: []
    }
  },
  computed: {
    uploadAction() {
      return `${baseUrl}/files/loadfiles/${this.temp.modularName}`
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    fileDelete(fileUuid) {
      fileDelete(fileUuid).then(res => {
        this.$notify.success({
          title: 'success',
          message: res
        })
      })
    },
    fileUpload(fileUuid) {
      fileUploadDatabase(fileUuid).then(res => {
        this.$notify.success({
          title: 'success',
          message: res
        })
      })
    },
    handlePreview() {
    },
    handleRemove() {
    },
    beforeRemove() {
    },
    handleExceed() {
      this.$notify.error({
        title: 'error',
        message: '上传文件数量限制为1'
      })
    },
    handleSearch() {
      this.tableLoading = true
      queryAllFiles(this.listQuery).then(res => {
        this.list = res.obj.records
        this.tableLoading = false
      })
    },
    handleUpload() {
      this.dialogFormVisible = true
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
