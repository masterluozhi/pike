
<template>
  <div>
    <el-form :inline="true">
      <el-button type="primary" @click="updateExcel()">上传excel配置表更新</el-button>
      <upload-config
        ref="upload"
        up-url="config/uploadConfigExcel/qa"
        down-url="https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E9%A1%BE%E5%AE%A2%E9%9C%80%E6%B1%82%E9%85%8D%E7%BD%AE.xlsx"
        config-name="问卷配置"
        @getDataList="this.initData"
      />
      <el-table v-horizontal-scroll="'always'" :data="arr" style="width: 100%">
        <el-table-column label="所属中心" width="110">
          <template v-slot="scope">
            <el-input value="生活中心" />
          </template>
        </el-table-column>
        <el-table-column label="一级分类" width="120">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].oneLevel" />
          </template>
        </el-table-column>
        <el-table-column label="二级分类" width="120">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].twoLevel" />
          </template>
        </el-table-column>
        <el-table-column label="三级分类" width="80">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].threeLevel" />
          </template>
        </el-table-column>
        <el-table-column label="问题" width="250">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].question" />
          </template>
        </el-table-column>
        <el-table-column label="类型" width="80">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].type" />
          </template>
        </el-table-column>
        <el-table-column label="答案类型" width="80">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].answerType" />
          </template>
        </el-table-column>
        <el-table-column label="选项一" width="80">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].oneOption" />
          </template>
        </el-table-column>
        <el-table-column label="选项二" width="80">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].twoOption" />
          </template>
        </el-table-column>
        <el-table-column label="选项三" width="80">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].threeOption" />
          </template>
        </el-table-column>
        <el-table-column label="答案" width="80">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].answer" />
          </template>
        </el-table-column>
        <el-table-column label="解析">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].exercises" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <el-button type="primary" @click="clickOne(scope.row)">修改</el-button>
            <el-button type="primary" @click="del(scope.row.id)">删除</el-button>
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
    clickOne(e) {
      this.$api.post('config/updateQAConfig', e).then(res => {
        this.$message.success('更新成功')
      })
    },
    del(e) {
      this.$api.del(`config/deleteQAConfig/${e}`).then(res => {
        this.$message.success('删除成功')
        this.initData()
      })
    },
    emit() {
      const valueList = this.arr.map(obj => Object.values(obj))
      this.$confirm('是否确认修改配置?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('config/putConfig/qa', valueList).then(res => {
          this.$message.success('更新成功')
        })
      })
    },
    initData() {
      this.$api.get('config/getQAConfig').then(res => {
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
