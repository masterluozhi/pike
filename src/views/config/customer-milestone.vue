
<template>
  <div>
    <el-form :inline="true">
      <el-button type="primary" @click="updateExcel()">上传excel配置表更新</el-button>
      <el-button type="primary" @click="emit">确定</el-button>
      <upload-config
        ref="upload"
        up-url="config/uploadConfigExcel/CustomerMilestone"
        down-url="https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E9%A1%BE%E5%AE%A2%E9%9C%80%E6%B1%82%E9%87%8C%E7%A8%8B%E7%A2%91%E9%85%8D%E7%BD%AE.xlsx"
        config-name="代币配置"
        @getDataList="this.initData"
      />
      <el-table v-horizontal-scroll="'always'" :data="arr" style="width: 100%">
        <el-table-column label="适用等级" width="100">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].level" />
          </template>
        </el-table-column>
        <el-table-column label="里程碑条件" width="140">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].milestone" />
          </template>
        </el-table-column>
        <el-table-column label="星星奖励" width="140">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].star" />
          </template>
        </el-table-column>
        <el-table-column label="随机奖励内容" width="500">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].reward" />
          </template>
        </el-table-column>
        <el-table-column label="随机奖励数量">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].rewardCount" />
          </template>
        </el-table-column>
        <el-table-column label="随机奖励概率">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].rewardRate" />
          </template>
        </el-table-column>

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
      const valueList = this.arr.map(obj => Object.values(obj))
      this.$confirm('是否确认修改配置?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('config/putConfig/CustomerMilestone', valueList).then(res => {
          this.$message.success('更新成功')
        })
      })
    },
    initData() {
      this.$api.get('config/getConfig/CustomerMilestone').then(res => {
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
