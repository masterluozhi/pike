
<template>
  <div>
    <el-form :inline="true">
      <el-button type="primary" @click="updateExcel()">上传excel配置表更新</el-button>
      <el-button type="primary" @click="emit">确定</el-button>
      <upload-config
        ref="upload"
        up-url="config/uploadConfigExcel/CustomerDemand"
        down-url="https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E9%A1%BE%E5%AE%A2%E9%9C%80%E6%B1%82%E9%85%8D%E7%BD%AE.xlsx"
        config-name="代币配置"
        @getDataList="this.initData"
      />
      <el-table v-horizontal-scroll="'always'" :data="arr" style="width: 100%">
        <el-table-column label="顾客需求ID" width="100">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].id" />
          </template>
        </el-table-column>
        <el-table-column label="需求名称" width="120">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].name" />
          </template>
        </el-table-column>
        <el-table-column label="所属中心" width="120">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].center" />
          </template>
        </el-table-column>
        <el-table-column label="首次活力值">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].vitalityF" />
          </template>
        </el-table-column>
        <el-table-column label="后续活力值">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].vitality" />
          </template>
        </el-table-column>
        <el-table-column label="首次助教基础价格">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].assPriceF" />
          </template>
        </el-table-column>
        <el-table-column label="后续助教基础价格">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].assPrice" />
          </template>
        </el-table-column>
        <el-table-column label="首次推荐权重">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].recommendWeightF" />
          </template>
        </el-table-column>
        <el-table-column label="后续推荐权重">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].recommendWeight" />
          </template>
        </el-table-column>
        <el-table-column label="单日次数上限">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].day" />
          </template>
        </el-table-column>
        <el-table-column label="单周次数上限">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].week" />
          </template>
        </el-table-column>
        <el-table-column label="开放条件-等级">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].level" />
          </template>
        </el-table-column>
        <el-table-column label="项目进度奖励">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].scheduleReward" />
          </template>
        </el-table-column>
        <el-table-column label="随机奖励" width="280">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].reward" />
          </template>
        </el-table-column>
        <el-table-column label="随机奖励数量" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].rewardCount" />
          </template>
        </el-table-column>
        <el-table-column label="随机奖励概率" width="200">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].rewardRate" />
          </template>
        </el-table-column>
        <el-table-column label="顾客请求" width="200" show-overflow-tooltip>
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].demand" />
          </template>
        </el-table-column>
        <el-table-column label="简介" width="200" show-overflow-tooltip>
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].desc" />
          </template>
        </el-table-column>
        <el-table-column label="说明" width="200" show-overflow-tooltip>
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].illustrate" />
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
        this.$api.post('config/putConfig/CustomerDemand', valueList).then(res => {
          this.$message.success('更新成功')
        })
      })
    },
    initData() {
      this.$api.get('config/getConfig/CustomerDemand').then(res => {
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
