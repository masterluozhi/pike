<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" label-width="160px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item v-for="(item,index) in columns" :key="index" :label="item" :prop="item">
        <el-input v-model="dataForm[item]" placeholder="" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  props: {
    columns: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      visible: false,
      extra: '额外的',
      dataForm: {
      }
    }
  },
  methods: {
    init(obj) {
      this.dataForm = obj
      this.visible = true
    },
    dataFormSubmit() {
      this.$emit('submitOk')

      this.visible = false
    }
  }
}
</script>
