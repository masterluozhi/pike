<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
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
        type="selection"
        header-align="center"
        align="center"
        width="50"
      />
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="道具名"
      />
      <el-table-column
        prop="summer"
        header-align="center"
        align="center"
        label="简介"
      />
      <el-table-column
        prop="increaseVitalityValue"
        header-align="center"
        align="center"
        label="增加的活力值"
      />
      <el-table-column
        prop="increaseMagicValue"
        header-align="center"
        align="center"
        label="增加的魔法数值"
      />
      <el-table-column
        prop="increaseExpValue"
        header-align="center"
        align="center"
        label="增加的经验值"
      />
      <el-table-column
        prop="multipleVitality"
        header-align="center"
        align="center"
        label="活力值倍数"
      />
      <el-table-column
        prop="multipleMagic"
        header-align="center"
        align="center"
        label="魔力倍数"
      />
      <el-table-column
        prop="multipleExp"
        header-align="center"
        align="center"
        label="经验倍数"
      />
      <el-table-column
        prop="effectiveRound"
        header-align="center"
        align="center"
        label="有效回合"
      />
      <el-table-column
        prop="effectiveTime"
        header-align="center"
        align="center"
        label="生效时间/秒"
      />
      <el-table-column
        prop="gemNumber"
        header-align="center"
        align="center"
        label="购买价格"
      />
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间"
      />
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="修改时间"
      />
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
          <el-button type="text" size="small" @click="syntheticHandle(scope.row.id)">合成</el-button>
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
    <synthetic-prop v-if="syntheticVisible" ref="syntheticProp" :rows="syntheticRows" url="prop/propSyntheticInfo/" @configSubmit="syntheticSumbit" />
  </div>
</template>

<script>
import AddOrUpdate from './prop-add-or-update'
import SyntheticProp from './prop-synthetic-prop'
export default {
  components: {
    AddOrUpdate,
    SyntheticProp
  },
  data() {
    return {
      dataForm: {
        key: ''
      },

      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      syntheticVisible: false,
      propList: [],
      syntheticRows: {
        'syntheticPropId': 'select',
        'number': 'number'
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
        'prop/paging',
        {
          'current': this.pageIndex,
          'pageSize': this.pageSize,
          'key': this.dataForm.key
        }
      ).then(res => {
        if (res && res.code === 200) {
          this.dataList = res.data.records
          this.totalPage = res.data.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
      })
      this.dataListLoading = false
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
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row)
      })
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[${ids.length}项道具]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.del(
          '/course/prop/delete',
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
    // 合成
    syntheticHandle(id) {
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
