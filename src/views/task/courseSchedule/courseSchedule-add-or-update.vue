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
      <el-form-item label="学院类型" prop="collegeType">
        <el-select v-model="dataForm.collegeType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="简述" prop="summer">
        <el-input v-model="dataForm.summer" placeholder="简述" />
      </el-form-item>
      <el-form-item label="分数" prop="score">
        <el-input-number v-model="dataForm.score" placeholder="分数" :precision="2" :min="0" />
      </el-form-item>
      <el-form-item label="延迟分数" prop="decayScore">
        <el-input-number v-model="dataForm.decayScore" placeholder="延迟分数" :precision="2" :min="0" />
      </el-form-item>
      <el-form-item label="是否必修" prop="hasNeed">
        <el-radio v-model="dataForm.hasNeed" :label="true">是</el-radio>
        <el-radio v-model="dataForm.hasNeed" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="每天限制次数" prop="limitDayCount">
        <el-input-number v-model="dataForm.limitDayCount" placeholder="每天限制次数" :min="0" />
      </el-form-item>
      <el-form-item label="每周限制次数" prop="limitWeekCount">
        <el-input-number v-model="dataForm.limitWeekCount" placeholder="每周限制次数" :min="0" />
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
      options: [{
        value: 0,
        label: '生活学院'
      }, {
        value: 1,
        label: '体育学院'
      }, {
        value: 2,
        label: '魔法学院'
      }, {
        value: 3,
        label: '心理学院'
      }, {
        value: 4,
        label: '公共学院'
      }],
      dataForm: {
        id: 0,
        name: '',
        collegeType: '',
        summer: '',
        score: '',
        decayScore: '',
        hasNeed: '',
        limitDayCount: '',
        limitWeekCount: ''
      },
      dataRule: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        collegeType: [
          { required: true, message: '学院不能为空', trigger: 'blur' }
        ],
        summer: [
          { required: true, message: '简述不能为空', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '得分不能为空', trigger: 'blur' }
        ],
        decayScore: [
          { required: true, message: '延迟得分不能为空', trigger: 'blur' }
        ],
        hasNeed: [
          { required: true, message: '必须不能为空', trigger: 'blur' }
        ],
        limitDayCount: [
          { required: true, message: '限制日不能为空', trigger: 'blur' }
        ],
        limitWeekCount: [
          { required: true, message: '限制周不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(data, propList) {
      this.dataForm = data
      this.propList = propList
      this.visible = true
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$api.post(
            `/course/${!this.dataForm.id ? 'saveCourse' : 'updateCourse'}`,
            this.dataForm
          ).then(res => {
            if (res && res.code === 200) {
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
