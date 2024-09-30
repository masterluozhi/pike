<template>
  <el-dialog
    :title="name"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-row v-for="(item, index) in config.keys()" :key="index">
      <div style="display: flex">
        <el-input :value="item" class="custom-input" @input="updateRoot(item, $event)" />
        <el-button
          type="danger"
          size="small"
          @click="delRoot(item)"
        >删除</el-button>
        <el-button
          v-if="index===config.size-1"
          type="success"
          size="small"
          @click="addRoot()"
        >新增</el-button>
      </div>
      <el-row v-for="(rowItem, rowIndex) in config.get(item)" :key="rowIndex" style="display: flex">
        <el-input :value="rowItem" @input="updateNode(item,rowIndex, $event)" />
        <el-button
          type="warning"
          size="small"
          @click="delNode(item,rowIndex)"
        >删除</el-button>
        <el-button
          v-if="rowIndex===config.get(item).length-1"
          type="primary"
          size="small"
          @click="addItem(item)"
        >新增</el-button>
      </el-row>
    </el-row>
    <el-upload ref="upload" :auto-upload="false" :multiple="true" :on-change="beforeUpload" :action="action" :file-list="fileList" :limit="1" :on-success="onSuccess" s-t-y-l-e="margin-left: 35%" :data="configId">
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        或者将文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button type="text" size="small" @click="handDown()">下载配置表</el-button>
      <el-button @click="visible = false">关闭</el-button>
      <el-button @click="submitUpload">确定上传</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {

  props: {
    action: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      startTime: '',
      endTime: '',
      visible: false,
      fileList: [],
      configId: {},
      config: new Map()
    }
  },
  methods: {
    beforeUpload(file, fileList) {
      if (file.status === 'ready') {
        this.fileList.push(file)
      } else {
        this.fileList = []
      }
    },
    init(id, config) {
      this.visible = true
      this.configId.id = parseInt(id)
      this.initConfigMap(JSON.parse(config))
    },
    initConfigMap(config) {
      for (const key in config) {
        if (config.hasOwnProperty(key)) {
          this.config.set(key, config[key])
        }
      }
    },
    onSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.$message.success('配置表生效')
      } else {
        this.$message.success('配置表失败')
      }
    },

    addItem(key) {
      const array = this.config.get(key)
      array.push('  ')
      this.$forceUpdate()
    },
    delRoot(item) {
      this.config.delete(item)
      this.$forceUpdate()
    },
    delNode(key, index) {
      const array = this.config.get(key)
      array.splice(index, 1)
      this.$forceUpdate()
    },
    addRoot() {
      this.config.set('', [])
      this.$forceUpdate()
    },
    updateRoot(key, event) {
      const array = this.config.get(key)
      this.config.delete(key)
      this.config.set(event, array)
      this.$forceUpdate()
    },
    updateNode(key, index, event) {
      const array = this.config.get(key)
      array[index] = event
      this.$forceUpdate()
    },
    submitUpload() {
      console.log(this.fileList)
      if (this.fileList.length > 0) {
        this.$confirm('修改配置', '提示', {
          confirmButtonText: '上传excel',
          cancelButtonText: '上传修改配置表',
          type: 'warning'
        }).then(() => {
          this.$refs.upload.submit()
          this.$emit('ok')
        }).catch(() => {
          this.updatePo()
        })
      } else {
        this.updatePo()
      }
    },
    updatePo() {
      const json = Object.fromEntries(this.config)
      this.$api.post('/course/courseInfo/update', {
        id: this.configId.id,
        config: JSON.stringify(json)
      }).then(res => {
        this.$message.success('修改成功')
        this.visible = false
        this.$emit('ok')
      })
    },
    handDown() {
      const a = document.createElement('a') // 创建一个a元素
      a.href = 'https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E9%85%8D%E7%BD%AE%E8%A1%A8.xlsx' // a元素图片地址
      a.download = '配置表.xlsx' // 图片名
      a.click()
    }
  }
}
</script>
<style lang = "scss">
.custom-input .el-input__inner {
  background-color: #ffff00; /* 你想要的颜色代码 */
}
</style>
