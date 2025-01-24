<template>
  <div class="mod-config">
    <el-table
      v-horizontal-scroll="'always'"
      :data="dataList"
      border
      style="width: 100%;"
    >
      <el-table-column
        v-for="(item,index) in columns"
        :key="index"
        :label="item"
        :prop="item"
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
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" :columns="columns" @submitOk="submit" />
  </div>
</template>
<script>
import AddOrUpdate from './config-add-or-update.vue'
export default {
  components: {
    AddOrUpdate
  },
  props: {
    columns: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      addOrUpdateVisible: false,
      dataList: []
    }
  },
  created() {
    this.getLevel()
  },
  methods: {
    addOrUpdateHandle(obj) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(obj)
      })
    },
    submit() {
      this.$api.post('config/putLevel',
        this.dataList
      ).then(res => {
        if (res.code === 200) {
          this.$message.success('更新成功')
        }
      })
    },
    getLevel() {
      this.$api.get(
        `config/getLevelConfigModel`
      ).then(res => {
        if (res && res.code === 200) {
          console.log(res)
          this.dataList = res.data
          console.log(this.dataList)
        } else {
          this.dataList = []
        }
        this.dataListLoading = false
      })
    }
  }
}
</script>
