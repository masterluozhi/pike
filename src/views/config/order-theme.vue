
<template>
  <div>
    <el-form :inline="true">
      <el-button type="primary" @click="updateExcel()">上传excel配置表更新</el-button>
      <el-button type="primary" @click="emit">确定</el-button>
      <upload-config
        ref="upload"
        up-url="config/uploadConfigExcel/OrderTheme"
        down-url="https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E8%AE%A2%E5%8D%95%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE.xlsx"
        config-name="代币配置"
        @getDataList="this.initData"
      />
      <el-table v-horizontal-scroll="'always'" :data="arr" style="width: 100%">
        <el-table-column label="主题ID" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].themeId" />
          </template>
        </el-table-column>
        <el-table-column label="主题名称">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].themeName" />
          </template>
        </el-table-column>
        <el-table-column label="展示条件-等级">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].showLevel" />
          </template>
        </el-table-column>
        <el-table-column label="展示条件-建造ID" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].constructionId" />
          </template>
        </el-table-column>
        <el-table-column label="解锁条件-等级">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].unlockLevel" />
          </template>
        </el-table-column>
        <el-table-column label="解锁条件-完成主题">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].unlockThemeId" />
          </template>
        </el-table-column>
        <el-table-column label="完成奖励" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].reward" />
          </template>
        </el-table-column>
        <el-table-column label="奖励数量">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].rewardCount" />
          </template>
        </el-table-column>
        <el-table-column label="主题简介">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].desc" />
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
        this.$api.post('config/putConfig/OrderTheme', valueList).then(res => {
          this.$message.success('更新成功')
        })
      })
    },
    initData() {
      this.$api.get('config/getConfig/OrderTheme').then(res => {
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
