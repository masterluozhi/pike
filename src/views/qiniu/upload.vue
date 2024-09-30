<template>
  <el-upload :multiple="true" :before-upload="beforeUpload" :action="action" :on-success="onSuccess" :file-list="fileList" :limit="1">
    <i class="el-icon-upload" />
    <div class="el-upload__text">
      将文件拖到此处，或<em>点击上传</em>
    </div>
  </el-upload>
</template>

<script>

import { string } from 'jszip/lib/support'

export default {
  props: {
    action: {
      type: string,
      require: true
    },
    type: {
      type: string,
      require: true
    },
    url: {
      type: string,
      require: true
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  mounted() {
    if (this.url) {
      this.fileList.push({ name: this.url.split('/').pop(), url: this.url })
    }
  },
  methods: {
    onSuccess(response, file, fileList) {
      this.$emit('onSuccess', this.type, response.data)
    },
    beforeUpload() {

    }
  }
}
</script>
