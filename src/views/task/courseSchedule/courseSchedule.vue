<template>
  <div style="margin-left:3%;margin-right:3%;margin-top: 10px">
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
        header-align="center"
        align="center"
        label="学院类型"
      >
        <template slot-scope="scope">
          <span>{{ getCollegeType(scope.row.collegeType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="summer"
        header-align="center"
        align="center"
        label="简述"
      />
      <el-table-column
        prop="score"
        header-align="center"
        align="center"
        label="分数"
      />
      <el-table-column
        prop="decayScore"
        header-align="center"
        align="center"
        label="延迟分数"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="是否必修"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.hasNeed?"是":"否" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="limitDayCount"
        header-align="center"
        align="center"
        label="每天限制次数"
      />
      <el-table-column
        prop="limitWeekCount"
        header-align="center"
        align="center"
        label="每周限制次数"
      />
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建日期"
      />
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdate(scope.row)">编辑信息</el-button>
          <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
    <synthetic-prop v-if="syntheticVisible" ref="syntheticProp" :rows="syntheticRows" url="course/courseProp/info/" @configSubmit="syntheticSumbit" />
  </div>

</template>

<script>

import assignment from './assignment/assignment.vue'
import AddOrUpdate from '../courseSchedule/courseSchedule-add-or-update.vue'
import SyntheticProp from '../../prop/prop-synthetic-prop.vue'

export default {
  name: 'Index',
  components: {
    SyntheticProp,
    AddOrUpdate,
    assignment
  },
  data() {
    return {
      dataForm: {
        name: ''
      },
      propList: [],
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false,
      syntheticVisible: false,
      syntheticRows: {
        propId: 'select',
        number: 'number',
        probability: 'double'
      }
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    addOrUpdate(obj) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(obj)
      })
    },
    getCollegeType(collageId) {
      if (collageId === 0) {
        return '生活学院'
      }
      if (collageId === 1) {
        return '体育学院'
      }
      if (collageId === 2) {
        return '魔法学院'
      }
      if (collageId === 3) {
        return '心理学院'
      }
      if (collageId === 4) {
        return '公共学院'
      }
    },
    getDataList() {
      this.dataListLoading = true
      this.$api.page(
        'course/coursePage',
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
    syntheticSumbit(syntheticProp, finishedPropId) {
      this.$api.post(
        'course/courseProp/addBatch',
        {
          courseSheduleId: finishedPropId,
          coursePropEntityList: syntheticProp
        }
      ).then(res => {
        this.$message.success('操作成功')
        this.syntheticVisible = false
      })
    },
    // 合成
    openProp(id) {
      if (this.propList) {
        this.getPropList(id)
      } else {
        this.syntheticVisible = true
        this.$nextTick(() => {
          this.$refs.syntheticProp.init(id, this.propList)
        })
      }
    },
    getPropList(id) {
      this.$api.get(
        'prop/list'
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
    del(id) {
      this.$api.del(`course/delCourse/${id}`).then(res => {
        if (res.code === 200) {
          this.getDataList()
        }
      })
    }
  }
}
</script>

<style lang = "scss">

</style>
