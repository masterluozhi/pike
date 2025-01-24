<template>
  <div>
    <el-form :inline="true">
      <el-button type="primary" @click="updateExcel()">上传excel配置表更新</el-button>
      <el-button type="primary" @click="emit">确定</el-button>
      <upload-config
        ref="upload"
        up-url="config/uploadConfigExcel/ConstructionTheme"
        down-url="https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E5%BB%BA%E9%80%A0%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE.xlsx"
        config-name="代币配置"
        @getDataList="this.initData"
      />
      <el-table v-horizontal-scroll="'always'" :data="arr" style="width: 100%">
        <el-table-column label="主题ID" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].id" />
          </template>
        </el-table-column>
        <el-table-column label="主题名称" width="150">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].name" />
          </template>
        </el-table-column>
        <el-table-column label="所属中心" width="110">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].type" />
          </template>
        </el-table-column>
        <el-table-column label="展示条件-等级" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].lv" />
          </template>
        </el-table-column>
        <el-table-column label="展示条件-建造ID" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].showId" />
          </template>
        </el-table-column>
        <el-table-column label="解锁条件-等级">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].unlock" />
          </template>
        </el-table-column>
        <el-table-column label="解锁条件-建造ID" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].unlockId" />
          </template>
        </el-table-column>
        <el-table-column label="完成奖励" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].award" />
          </template>
        </el-table-column>
        <el-table-column label="奖励数量" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].awardCnt" />
          </template>
        </el-table-column>
        <el-table-column label="主题简介" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].desc" />
          </template>
        </el-table-column>
        <el-table-column label="x">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].x" />
          </template>
        </el-table-column>
        <el-table-column label="y">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].y" />
          </template>
        </el-table-column>
        <el-table-column label="偏移" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].offset" />
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
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
        this.$api.post('config/putConfig/ConstructionTheme', valueList).then(res => {
          this.$message.success('更新成功')
        })
      })
    },
    initData() {
      this.$api.get('config/getConfig/ConstructionTheme').then(res => {
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
