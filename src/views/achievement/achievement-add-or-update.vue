<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="" prop="name">
        <el-input v-model="dataForm.name" placeholder="" />
      </el-form-item>
      <el-form-item label="简介" prop="summer">
        <el-input v-model="dataForm.summer" placeholder="简介" />
      </el-form-item>
      <el-form-item label="完成条件类型" prop="completeType">
        <el-input v-model="dataForm.completeType" placeholder="完成条件类型" />
      </el-form-item>
      <el-form-item label="等级" prop="level">
        <el-input v-model="dataForm.level" placeholder="等级" />
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input v-model="dataForm.number" placeholder="数量" />
      </el-form-item>
      <el-form-item label="" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="updateTime">
        <el-input v-model="dataForm.updateTime" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="deleted">
        <el-input v-model="dataForm.deleted" placeholder="" />
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
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: '',
        summer: '',
        completeType: '',
        level: '',
        number: '',
        createTime: '',
        updateTime: '',
        deleted: ''
      },
      dataRule: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        summer: [
          { required: true, message: '简介不能为空', trigger: 'blur' }
        ],
        completeType: [
          { required: true, message: '完成条件类型不能为空', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '等级不能为空', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '数量不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        deleted: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      //   this.$nextTick(() => {
      //     this.$refs['dataForm'].resetFields()
      //     if (this.dataForm.id) {
      //     })
      // }
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$api.post(
            `/mingxing/achievement/${!this.dataForm.id ? 'save' : 'update'}`,
            {
              'id': this.dataForm.id || undefined,
              'name': this.dataForm.name,
              'summer': this.dataForm.summer,
              'completeType': this.dataForm.completeType,
              'level': this.dataForm.level,
              'number': this.dataForm.number,
              'createTime': this.dataForm.createTime,
              'updateTime': this.dataForm.updateTime,
              'deleted': this.dataForm.deleted
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
      })
    }
  }
}
</script>
