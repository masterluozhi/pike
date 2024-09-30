<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="" />
      </el-form-item>
      <el-form-item label="总结" prop="summer">
        <el-input v-model="dataForm.summer" placeholder="总结" />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <!--      <upload :url="dataForm.icon" type="icon" :action="process.env.VUE_APP_BASE_APIupload+'/upload/upload'" @onSuccess="uploadSuccess"></upload>-->
      </el-form-item>
      <el-form-item label="资源" prop="icon">
        <!--     ess"></upload>-->
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :disabled="isSubmit" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import upload from '../../../qiniu/upload.vue'

export default {
  components: {
    upload
  },
  data() {
    return {
      isSubmit: false,
      options: [{
        value: 0,
        label: '个数'
      }, {
        value: 1,
        label: '时间'
      }],
      visible: false,
      dataForm: {
        id: 0,
        name: '',
        summer: '',
        icon: '',
        typeId: 0
      },
      dataRule: {
        summer: [
          { required: true, message: '总结不能为空', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '图标不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(courseScheduleId, id) {
      this.dataForm.id = id || 0
      this.dataForm.courseScheduleId = courseScheduleId
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$api.get(
            `courseSchedule/infoAssignment/${this.dataForm.id}`
          ).then(res => {
            if (res && res.code === 200) {
              this.dataForm.summer = res.data.summer
              this.dataForm.icon = res.data.icon
              this.dataForm.createTime = res.data.createTime
              this.dataForm.updateTime = res.data.updateTime
              this.dataForm.url = res.data.url
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.isSubmit = true
          this.$api.post(
            `courseSchedule/${!this.dataForm.id ? 'addAssignment' : 'updateAssignment'}`,
            {
              'id': this.dataForm.id || undefined,
              'summer': this.dataForm.summer,
              'icon': this.dataForm.icon,
              'courseScheduleId': this.dataForm.courseScheduleId,
              'url': this.dataForm.url
            }
          ).then(res => {
            if (res && res.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.isSubmit = true
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
            this.isSubmit = false
          })
        }
      })
    },
    uploadSuccess(type, url) {
      this.dataForm[type] = url
    }
  }
}
</script>
