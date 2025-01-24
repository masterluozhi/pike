
<template>
  <div>
    <el-form :inline="true">
      <el-button type="primary" @click="updateExcel()">上传excel配置表更新</el-button>
      <el-button type="primary" @click="emit">确定</el-button>
      <upload-config
        ref="upload"
        up-url="config/uploadConfigExcel/ConstructionContent"
        down-url="https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E5%BB%BA%E9%80%A0%E5%86%85%E5%AE%B9%E9%85%8D%E7%BD%AE.xlsx"
        config-name="代币配置"
        @getDataList="this.initData"
      />
      <el-table v-horizontal-scroll="'always'" :data="arr" style="width: 100%">
        <el-table-column label="主题ID" width="100">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].roomId" />
          </template>
        </el-table-column>
        <el-table-column label="建造物ID" width="100">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].itemId" />
          </template>
        </el-table-column>
        <el-table-column label="建造物名称">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].itemName" />
          </template>
        </el-table-column>
        <el-table-column label="消费星星">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].stars" />
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].itemType" />
          </template>
        </el-table-column>
        <el-table-column label="完成奖励" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].reward" />
          </template>
        </el-table-column>
        <el-table-column label="奖励数量" width="100">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].rewardCount" />
          </template>
        </el-table-column>
        <el-table-column label="建造度">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].progress" />
          </template>
        </el-table-column>
        <el-table-column label="后续建造物" width="100">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].next" />
          </template>
        </el-table-column>
        <el-table-column label="收益属性ID" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].buff" />
          </template>
        </el-table-column>
        <el-table-column label="收益属性权重" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].buffWeight" />
          </template>
        </el-table-column>
        <el-table-column label="建造物简介" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].desc" />
          </template>
        </el-table-column>
        <el-table-column label="长">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].x" />
          </template>
        </el-table-column>
        <el-table-column label="宽">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].y" />
          </template>
        </el-table-column>
        <el-table-column label="位置" width="100">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].pos" />
          </template>
        </el-table-column>
        <el-table-column label="皮肤" width="120">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].skin" />
          </template>
        </el-table-column>
        <el-table-column label="升级皮肤" width="120">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].unlockSkin" />
          </template>
        </el-table-column>
        <el-table-column label="朝向">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].face" />
          </template>
        </el-table-column>
        <el-table-column label="朝向个数">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].faceMax" />
          </template>
        </el-table-column>
        <el-table-column label="种类">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].type" />
          </template>
        </el-table-column>
        <el-table-column label="eff">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].eff" />
          </template>
        </el-table-column>
        <el-table-column label="皮肤对应id" width="120">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].id" />
          </template>
        </el-table-column>
        <el-table-column label="顺序">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].order" />
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
        this.$api.post('config/putConfig/ConstructionContent', valueList).then(res => {
          this.$message.success('更新成功')
        })
      })
    },
    initData() {
      this.$api.get('config/getConfig/ConstructionContent').then(res => {
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
