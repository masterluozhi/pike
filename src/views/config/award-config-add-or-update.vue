<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="" />
      </el-form-item>
      <el-form-item label="经验" prop="exp">
        <el-input v-model="dataForm.exp" placeholder="" />
      </el-form-item>
      <el-form-item :label="extra" prop="extra">
        <el-input v-model="dataForm.extra" placeholder="" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { postWWW } from '@/api/api'

export default {
  data() {
    return {
      visible: false,
      extra: '额外的',
      dataForm: {
        id: 0,
        name: '',
        exp: '',
        extra: ''
      }
    }
  },
  methods: {
    init(obj) {
      this.extra = '额外的'
      this.dataForm = obj
      if (this.dataForm.name === '魔法页评级') {
        this.extra = this.extra + '(学分)'
      }
      if (this.dataForm.name === '魔法卷评级') {
        this.extra = this.extra + '(学分)'
      }
      this.visible = true
    },
    // 表单提交
    dataFormSubmit() {
      this.$api.postWWW('config/updateAwardConfig',
        {
          'id': this.dataForm.id,
          'exp': this.dataForm.exp,
          'extra': this.dataForm.extra
        }
      ).then(data => {
        if (data && data.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>
