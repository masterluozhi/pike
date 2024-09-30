
<template>
  <div>
    <el-form :inline="true">
      <el-button type="primary" @click="updateExcel()">上传excel配置表更新</el-button>
      <el-button type="primary" @click="emit">确定</el-button>
      <upload-config
        ref="upload"
        up-url="config/uploadConfigExcel/InitialLayout"
        down-url="https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E6%A3%8B%E7%9B%98%E5%88%9D%E5%A7%8B%E9%85%8D%E7%BD%AE.xlsx"
        config-name="棋盘初始配置"
        @getDataList="this.initData"
      />
      <el-table :data="arr" style="width: 100%">
        <el-table-column label="棋盘ID" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][0]" />
          </template>
        </el-table-column>
        <el-table-column label="行数">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][1]" />
          </template>
        </el-table-column>
        <el-table-column label="列数">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][2]" />
          </template>
        </el-table-column>
        <el-table-column label="元素ID">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][3]" />
          </template>
        </el-table-column>
        <el-table-column label="格子状态">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][4]" />
          </template>
        </el-table-column>>
      </el-table>
    </el-form>
  </div>
</template>
<script >
import UploadConfig from '@/views/qiniu/uploadConfig.vue'

export default {
  components: { UploadConfig },
  data() {
    return {
      isUp: false,
      arr: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    emit() {
      this.$confirm('是否确认修改配置?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('config/putInitialLayout', this.arr).then(res => {
          this.$message.success('更新成功')
        })
      })
    },
    initData() {
      this.$api.get('config/getInitialLayout').then(res => {
        this.arr = res.data
      })
    },
    updateExcel() {
      this.$refs.upload.isUp = true
    }
  }
}
</script>
<style scoped lang="scss">

</style>
