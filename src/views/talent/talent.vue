<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="参数名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
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
        label="达人称号"
      />
      <el-table-column
        prop="level"
        header-align="center"
        align="center"
        label="等级"
      />
      <el-table-column
        prop="sequenceId"
        header-align="center"
        align="center"
        label="串号"
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
          <el-button type="text" size="small" @click="openCondition(scope.row.id)">完成条件</el-button>
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
    <synthetic-prop v-if="syntheticVisible" ref="syntheticProp" :rows="syntheticRows" url="AT/talentCondition/" @configSubmit="syntheticSumbit" />
  </div>
</template>

<script>
import AddOrUpdate from './talent-add-or-update'
import SyntheticProp from '@/views/prop/prop-synthetic-prop.vue'

export default {
  components: {
    SyntheticProp,
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        name: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      syntheticVisible: false,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      syntheticRows: {
        'courseName': 'select',
        'requireNumber': 'number'
      }
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
        '/AT/talentPage',
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
    // 新增 / 修改
    addOrUpdateHandle(obj) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(obj)
      })
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`确定对进行删除操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.del(
          `AT/deleteTalent/${id}`
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
    openCondition(id) {
      this.$api.get(
        'course/courseList'
      ).then(res => {
        if (res && res.code === 200) {
          this.propList = res.data
        }
        this.syntheticVisible = true
        this.$nextTick(() => {
          this.$refs.syntheticProp.init(id, this.propList)
        })
      })
    },
    syntheticSumbit(syntheticProp, finishedPropId) {
      this.$api.post(
        'prop/addBatchSyntheticProp',
        {
          finishedPropId: finishedPropId,
          propSyntheticEntityList: syntheticProp
        }
      ).then(res => {
        this.$message.success('操作成功')
        this.syntheticVisible = false
      })
    }
  }
}
</script>
