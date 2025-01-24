<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      v-horizontal-scroll="'always'"
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
        header-align="center"
        align="center"
        label="名称"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name +(scope.row.sort+1>1?scope.row.sort+1:"") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="exp"
        header-align="center"
        align="center"
        label="获得经验"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="额外参数"
      >
        <template slot-scope="scope">
          <span>{{ getExtra(scope.row.name,scope.row.extra) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="syntheticHandle(scope.row.id)">奖励道具</el-button>
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
    <synthetic-prop v-if="syntheticVisible" ref="syntheticProp" :rows="syntheticRows" url="config/props/" @configSubmit="syntheticSumbit" />
  </div>
</template>
<script>
import AddOrUpdate from './award-config-add-or-update.vue'
import SyntheticProp from '../prop/prop-synthetic-prop'
export default {
  components: {
    AddOrUpdate,
    SyntheticProp
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
      dataListLoading: false,
      addOrUpdateVisible: false,
      syntheticVisible: false,
      propList: [],
      syntheticRows: {
        'propId': 'select',
        'number': 'number'
      }
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    getExtra(name, extra) {
      if (name === '魔法页评级') {
        return extra + '(学分)'
      }
      if (name === '魔法卷评级') {
        return extra + '(学分)'
      }
      return ''
    },
    addOrUpdateHandle(obj) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(obj)
      })
    },
    getDataList() {
      this.dataListLoading = true
      this.$api.page(
        'config/page',
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
    syntheticSumbit(syntheticProp, finishedPropId) {
      this.$api.post(
        'config/addBatchSyntheticProp',
        {
          finishedPropId: finishedPropId,
          propSyntheticEntityList: syntheticProp
        }
      ).then(res => {
        this.$message.success('操作成功')
        this.syntheticVisible = false
      })
    },
    syntheticHandle(id) {
      if (this.propList) {
        this.getPropList(id)
      } else {
        this.syntheticVisible = true
        this.$nextTick(() => {
          this.$refs.syntheticProp.init(id, this.propList)
        })
      }
    }
  }
}
</script>
