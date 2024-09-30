
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
      <el-table :data="arr" style="width: 100%">
        <el-table-column label="主题ID" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][0]" />
          </template>
        </el-table-column>
        <el-table-column label="主题名称">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][1]" />
          </template>
        </el-table-column>
        <el-table-column label="所属中心">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][2]" />
          </template>
        </el-table-column>
        <el-table-column label="展示条件-等级" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][3]" />
          </template>
        </el-table-column>
        <el-table-column label="展示条件-建造ID">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][4]" />
          </template>
        </el-table-column>
        <el-table-column label="解锁条件-等级">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][5]" />
          </template>
        </el-table-column>
        <el-table-column label="解锁条件-建造ID" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][6]" />
          </template>
        </el-table-column>
        <el-table-column label="完成奖励">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][7]" />
          </template>
        </el-table-column>
        <el-table-column label="奖励数量">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][8]" />
          </template>
        </el-table-column>
        <el-table-column label="主题简介" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][9]" />
          </template>
        </el-table-column>
        <el-table-column label="x" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][10]" />
          </template>
        </el-table-column>
        <el-table-column label="y" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][11]" />
          </template>
        </el-table-column>
        <el-table-column label="偏移" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][12]" />
          </template>
        </el-table-column>
        <el-table-column label="最大客人数" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][13]" />
          </template>
        </el-table-column>
        <el-table-column label="图标" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][14]" />
          </template>
        </el-table-column>
        <el-table-column label="星" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][15]" />
          </template>
        </el-table-column>
        <el-table-column label="zb" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][16]" />
          </template>
        </el-table-column>
        <el-table-column label="图片" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][17]" />
          </template>
        </el-table-column>
        <el-table-column label="墙" width="180">
          <template v-slot="scope">
            <el-input v-model="arr[scope.$index][18]" />
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
        this.$api.post('config/putConstructionTheme', this.arr).then(res => {
          this.$message.success('更新成功')
        })
      })
    },
    initData() {
      this.$api.get('config/getConstructionTheme').then(res => {
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
