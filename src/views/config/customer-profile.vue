
<template>
  <div>
    <el-form :inline="true">
      <el-button type="primary" @click="updateExcel()">上传excel配置表更新</el-button>
      <el-button type="primary" @click="emit">确定</el-button>
      <upload-config
        ref="upload"
        up-url="config/uploadConfigExcel/CustomerProfile"
        down-url="https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E9%A1%BE%E5%AE%A2%E6%A1%A3%E6%A1%88%E9%85%8D%E7%BD%AE.xlsx"
        config-name="代币配置"
        @getDataList="this.initData"
      />
      <el-table :data="arr" style="width: 100%">
        <el-table-column label="顾客档案ID" width="100">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][0]" />
          </template>
        </el-table-column>
        <el-table-column label="顾客类型">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][1]" />
          </template>
        </el-table-column>
        <el-table-column label="顾客名称">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][2]" />
          </template>
        </el-table-column>
        <el-table-column label="出场条件-建造物ID" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][3]" />
          </template>
        </el-table-column>
        <el-table-column label="性别">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][4]" />
          </template>
        </el-table-column>
        <el-table-column label="年龄">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][5]" />
          </template>
        </el-table-column>
        <el-table-column label="身体状态" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][6]" />
          </template>
        </el-table-column>
        <el-table-column label="认知功能" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][7]" />
          </template>
        </el-table-column>
        <el-table-column label="心理状态" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][8]" />
          </template>
        </el-table-column>
        <el-table-column label="生化指标" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][9]" />
          </template>
        </el-table-column>
        <el-table-column label="简介" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][10]" />
          </template>
        </el-table-column>
        <el-table-column label="客户反映" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][11]" />
          </template>
        </el-table-column>
        <el-table-column label="皮肤" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][12]" />
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
        this.$api.post('config/putCustomerProfile', this.arr).then(res => {
          this.$message.success('更新成功')
        })
      })
    },
    initData() {
      this.$api.get('config/getCustomerProfile').then(res => {
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
