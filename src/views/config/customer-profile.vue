
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
      <el-table v-horizontal-scroll="'always'" :data="arr" style="width: 100%">
        <el-table-column label="顾客档案ID" width="100">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].id" />
          </template>
        </el-table-column>
        <el-table-column label="顾客类型">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].type" />
          </template>
        </el-table-column>
        <el-table-column label="顾客名称" width="160">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].name" />
          </template>
        </el-table-column>
        <el-table-column label="出场条件-建造物ID" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].condition" />
          </template>
        </el-table-column>
        <el-table-column label="性别">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].sex" />
          </template>
        </el-table-column>
        <el-table-column label="年龄">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].age" />
          </template>
        </el-table-column>
        <el-table-column label="身体状态" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].physics" />
          </template>
        </el-table-column>
        <el-table-column label="认知功能" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].cog" />
          </template>
        </el-table-column>
        <el-table-column label="心理状态" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].mental" />
          </template>
        </el-table-column>
        <el-table-column label="生化指标" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].org" />
          </template>
        </el-table-column>
        <el-table-column label="简介" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].desc" />
          </template>
        </el-table-column>
        <el-table-column label="客户反映" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].demand" />
          </template>
        </el-table-column>
        <el-table-column label="皮肤" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index].skin" />
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
        this.$api.post('config/putConfig/CustomerProfile', valueList).then(res => {
          this.$message.success('更新成功')
        })
      })
    },
    initData() {
      this.$api.get('config/getConfig/CustomerProfile').then(res => {
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
