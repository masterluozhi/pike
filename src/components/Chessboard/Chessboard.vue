<template>
  <div>
    <el-form :inline="true">
      <el-button type="primary" @click="updateExcel()">上传excel配置表更新</el-button>
      <el-button type="primary" @click="emit">确定</el-button>
      <upload-config
        ref="upload"
        up-url="config/uploadConfigExcelNoHead/Layout"
        down-url="https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E5%85%83%E7%B4%A0%E9%85%8D%E7%BD%AE.xlsx"
        config-name="主棋盘初始布局"
        @getDataList="this.initData"
      />
    </el-form>
    <div class="chessboard">
      <div v-for="(col, colIndex) in arr" :key="colIndex" class="row">
        <input
          v-for="(row, rowIndex) in col"
          :key="rowIndex"
          type="text"
          class="cell"
          :value="arr[colIndex][rowIndex]"
          @input="handleInput(colIndex, rowIndex, $event.target.value)"
        >
      </div>
    </div>

  </div>
</template>

<script>
import UploadConfig from '@/views/qiniu/uploadConfig.vue'

export default {
  components: { UploadConfig },
  data() {
    return {
      rows: 7,
      cols: 9,
      arr: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.initData()
    },
    emit() {
      this.$confirm('是否确认修改配置?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postData(this.arr)
      })
    },
    postData() {
      this.$api.post(`config/putLayout`, this.arr).then(res => {
        this.$message.success('保存成功')
      })
    },
    initDataEempty() {
      for (let i = 0; i < this.cols; i++) {
        if (!this.arr[i]) {
          this.arr[i] = []
        }
        for (let j = 0; j < this.rows; j++) {
          if (!this.arr[i][j]) {
            this.arr[i][j] = ''
          }
        }
      }
      console.log(this.arr)
    },
    initData() {
      this.$api.get('config/getLayout').then(res => {
        if (res.data) {
          this.arr = res.data
        }
        this.initDataEempty()
      })
    },
    handleInput(colIndex, rowIndex, value) {
      if (!this.arr[colIndex]) {
        this.arr[colIndex] = []
      }
      this.arr[colIndex][rowIndex] = value
    },
    updateExcel() {
      this.$refs.upload.isUp = true
    }
  }
}
</script>
<style scoped>

.cell {
  border: 1px solid #ccc;
  text-align: center;
  height: 60px;

}
</style>
