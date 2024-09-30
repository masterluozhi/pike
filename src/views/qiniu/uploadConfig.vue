
<template>
  <el-dialog
    title="上传文件"
    :close-on-click-modal="false"
    width="40%"
    :visible.sync="isUp"
  >
    <el-upload
      ref="upload"
      style="margin-left: 15%"
      drag
      action=""
      :limit="1"
      :http-request="uploadFile"
      :auto-upload="false"
      multiple
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="noUp">取消</el-button>
      <el-button type="primary" size="small" @click="handDown()">下载配置表</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip" style="color: red">
        提示：仅允许导入“xlsx”格式文件！
      </div>
    </span>
  </el-dialog>
</template>
<script>

export default {
  props: {
    configName: {
      type: String,
      require: true
    },
    downUrl: {
      type: String,
      require: true
    },
    upUrl: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      isUp: false
    }
  },

  methods: {
    noUp() {
      this.$refs.upload.clearFiles()
      this.isUp = false
    },
    submitUpload() {
      this.$confirm(`确定上传文件到服务器?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.upload.submit()
      })
    },
    uploadFile(item) {
      const FormDatas = new FormData()
      FormDatas.append('file', item.file)
      this.$api.file(this.upUrl, FormDatas).then(res => {
        if (res.code === 200) {
          this.isUp = false
        }
        this.$refs.upload.clearFiles()
        this.$emit('getDataList')
      })
    },
    handDown() {
      const a = document.createElement('a') // 创建一个a元素
      a.href = this.downUrl // a元素图片地址
      a.download = this.configName
      a.click()
    }
  }
}
</script>
<style scoped lang="scss">

</style>
