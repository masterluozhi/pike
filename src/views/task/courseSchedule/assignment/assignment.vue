<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <!--        <el-button  type="primary" @click="addOrUpdateHandle()">新增</el-button>-->
        <!--        <el-button  type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      style="width: 100%;"
      @selection-change="selectionChangeHandle"
    >
      <el-table-column
        label="编号"
        type="index"
        width="50"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ (pageIndex - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sportsName"
        header-align="center"
        align="center"
        label="动作名称"
      />
      <el-table-column
        prop="courseName"
        header-align="center"
        align="center"
        label="课程名称"
      />
      <el-table-column
        prop="maintitle"
        header-align="center"
        align="center"
        label="主标题"
      />
      <el-table-column
        prop="subtitle"
        header-align="center"
        align="center"
        label="副标题"
      />
      <el-table-column
        prop="icon"
        header-align="center"
        align="center"
        label="图标"
      >
        <template slot-scope="scope">
          <el-image
            :src="scope.row.icon"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        label="资源url"
      />

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="uploadConfig(scope.row.id,scope.row.config)">上传配置</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    />
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
    <uploadd-dialog ref="uploadd" :action="apiBase+'/upload/uploadExcel'" @ok="getDataList()" />
  </div>
</template>

<script>
import AddOrUpdate from './assignment-add-or-update.vue'
import UploaddDialog from '../../../qiniu/uploaddDialog.vue'
export default {
  components: {
    UploaddDialog,
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        key: ''
      },
      apiBase: process.env.VUE_APP_BASE_API,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$api.page(
        '/sports/page',
        {
          current: this.pageIndex,
          pageSize: this.pageSize
        }
      ).then(res => {
        if (res && res.code === 200) {
          this.dataList = res.data.records
          this.totalPage = res.data.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(this.idsList[0], id)
      })
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.del(
          'course/courseInf/del',
          ids
        ).then(res => {
          if (res && res.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    uploadConfig(id, config) {
      this.$refs.uploadd.init(id, config)
    }
  }
}
</script>
