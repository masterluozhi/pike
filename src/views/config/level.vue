
<template>
  <div>
    <el-form :inline="true">
      <el-button type="primary" @click="updateExcel()">上传excel配置表更新</el-button>
      <el-button type="primary" @click="emit">确定</el-button>
      <upload-config
        ref="upload"
        up-url="config/uploadConfigExcel/Level"
        down-url="https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E5%8D%87%E7%BA%A7%E9%85%8D%E7%BD%AE.xlsx"
        config-name="升级配置"
        @getDataList="this.initData"
      />
      <el-table v-horizontal-scroll="'always'" :data="arr" style="width: 100%">
        <el-table-column label="等级" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].level" />
          </template>
        </el-table-column>
        <el-table-column label="下一级所需经验">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].upgradeExp" />
          </template>
        </el-table-column>
        <el-table-column label="完成奖励">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].reward" />
          </template>
        </el-table-column>
        <el-table-column label="奖励数量">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].rewardCount" />
          </template>
        </el-table-column>
        <el-table-column label="任务数量">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].taskCount" />
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
      const valueList = this.arr.map(obj => Object.values(obj))
      this.$confirm('是否确认修改配置?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('config/putConfig/Level', valueList).then(res => {
          this.$message.success('更新成功')
        })
      })
    },
    initData() {
      this.$api.get('config/getConfig/Level').then(res => {
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
