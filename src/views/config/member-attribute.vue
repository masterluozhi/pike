
<template>
  <div>
    <el-form :inline="true">
      <el-button type="primary" @click="updateExcel()">上传excel配置表更新</el-button>
      <el-button type="primary" @click="emit">确定</el-button>
      <upload-config
        ref="upload"
        up-url="config/uploadConfigExcel/MemberAttribute"
        down-url="https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E4%BC%9A%E5%91%98%E5%B1%9E%E6%80%A7%E9%85%8D%E7%BD%AE.xlsx"
        config-name="会员属性配置"
        @getDataList="this.initData"
      />
      <el-table :data="arr" style="width: 100%">
        <el-table-column label="会员属性ID" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][0]" />
          </template>
        </el-table-column>
        <el-table-column label="属性模块">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][1]" />
          </template>
        </el-table-column>
        <el-table-column label="属性名称">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][2]" />
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
      this.$confirm('是否确认修改配置?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('config/putMemberAttribute', this.arr).then(res => {
          this.$message.success('更新成功')
        })
      })
    },
    initData() {
      this.$api.get('config/getMemberAttribute').then(res => {
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
