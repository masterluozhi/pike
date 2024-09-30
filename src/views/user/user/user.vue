<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="姓名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
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
        prop="name"
        header-align="center"
        align="center"
        label="名称"
      />
      <el-table-column
        prop="exp"
        header-align="center"
        align="center"
        label="经验"
      />
      <el-table-column
        prop="phone"
        header-align="center"
        align="center"
        label="手机号码"
      />
      <el-table-column
        prop="winningDays"
        header-align="center"
        align="center"
        label="连胜天数"
      />
      <el-table-column
        prop="magicPageLegend"
        header-align="center"
        align="center"
        label="传奇魔法页"
      />
      <el-table-column
        prop="magicPageLegend"
        header-align="center"
        align="center"
        label="传奇魔法页"
      />
      <el-table-column
        prop="magicPagePerfect"
        header-align="center"
        align="center"
        label="完美魔法页"
      />
      <el-table-column
        prop="magicPageExcellent"
        header-align="center"
        align="center"
        label="优秀魔法页"
      />
      <el-table-column
        prop="photoCount"
        header-align="center"
        align="center"
        label="拍照次数"
      />
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间"
      />
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateHandler(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="openSurvey(scope.row.id)">问卷信息</el-button>
          <el-button type="text" size="small" @click="openProp(scope.row.id)">道具信息</el-button>
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
    <user-health-survey v-if="openSurVeyVisible" ref="survey" @refreshDataList="getDataList" />
    <user-prop v-if="openPropVisible" ref="prop" @refreshDataList="getDataList" />
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />-->
  </div>
</template>

<script>
import AddOrUpdate from './user-add-or-update.vue'
import UserHealthSurvey from './user-health-survey.vue'
import UserProp from './user-prop.vue'
export default {
  components: {
    UserHealthSurvey,
    AddOrUpdate,
    UserProp
  },
  data() {
    return {
      dataForm: {
        name: ''
      },
      addOrUpdateVisible: false,
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      openSurVeyVisible: false,
      openPropVisible: false
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
        'user/page',
        {
          'current': this.pageIndex,
          'pageSize': this.pageSize,
          'name': this.dataForm.name
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
    openSurvey(id) {
      this.openSurVeyVisible = true
      this.$nextTick(() => {
        this.$refs.survey.init(id)
      })
    },
    openProp(id) {
      this.openPropVisible = true
      this.$nextTick(() => {
        this.$refs.prop.init(id)
      })
    },
    updateHandler(obj) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(obj)
      })
    }

    // // 删除
    // deleteHandle (id) {
    //   var ids = id ? [id] : this.dataListSelections.map(item => {
    //     return item.id
    //   })
    //   this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$api.del(
    //       `/userbuff/delete`,
    //       ids
    //     ).then(res => {
    //       if (res && res.code === 200) {
    //         this.$message({
    //           message: '操作成功',
    //           type: 'success',
    //           duration: 1500,
    //           onClose: () => {
    //             this.getDataList()
    //           }
    //         })
    //       } else {
    //         this.$message.error(data.msg)
    //       }
    //     })
    //   })
    // }
  }
}
</script>
