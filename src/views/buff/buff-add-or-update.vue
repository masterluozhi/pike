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
      <el-form-item label="总结" prop="summer">
        <el-input v-model="dataForm.summer" placeholder="总结" />
      </el-form-item>
      <el-form-item label="区分是定时还算其他需要完成目标完成度目前不细分" prop="type">
        <el-input v-model="dataForm.type" placeholder="区分是定时还算其他需要完成目标完成度目前不细分" />
      </el-form-item>
      <el-form-item label="完成度" prop="needProcess">
        <el-input v-model="dataForm.needProcess" placeholder="完成度" />
      </el-form-item>
      <el-form-item label="任务id" prop="taskId">
        <el-input v-model="dataForm.taskId" placeholder="任务id" />
      </el-form-item>
      <el-form-item label="奖励的宝石数量" prop="awardGemNumber">
        <el-input v-model="dataForm.awardGemNumber" placeholder="奖励的宝石数量" />
      </el-form-item>
      <el-form-item label="奖励的道具id" prop="awardPropId">
        <el-input v-model="dataForm.awardPropId" placeholder="奖励的道具id" />
      </el-form-item>
      <el-form-item label="奖励的道具数量" prop="awardPropNumber">
        <el-input v-model="dataForm.awardPropNumber" placeholder="奖励的道具数量" />
      </el-form-item>
      <el-form-item label="第二个奖励的id" prop="awardSecondPropId">
        <el-input v-model="dataForm.awardSecondPropId" placeholder="第二个奖励的id" />
      </el-form-item>
      <el-form-item label="第二个物品的奖励数量" prop="awardSecondPropNumber">
        <el-input v-model="dataForm.awardSecondPropNumber" placeholder="第二个物品的奖励数量" />
      </el-form-item>
      <el-form-item label="第三个奖励的道具id" prop="awardThirdPropId">
        <el-input v-model="dataForm.awardThirdPropId" placeholder="第三个奖励的道具id" />
      </el-form-item>
      <el-form-item label="第三个奖励的数量" prop="awardThirdPropNumber">
        <el-input v-model="dataForm.awardThirdPropNumber" placeholder="第三个奖励的数量" />
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
        type: '',
        needProcess: '',
        taskId: '',
        awardGemNumber: '',
        awardPropId: '',
        awardPropNumber: '',
        awardSecondPropId: '',
        awardSecondPropNumber: '',
        awardThirdPropId: '',
        awardThirdPropNumber: '',
        createTime: '',
        updateTime: '',
        deleted: ''
      },
      dataRule: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        summer: [
          { required: true, message: '总结不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '区分是定时还算其他需要完成目标完成度目前不细分不能为空', trigger: 'blur' }
        ],
        needProcess: [
          { required: true, message: '完成度不能为空', trigger: 'blur' }
        ],
        taskId: [
          { required: true, message: '任务id不能为空', trigger: 'blur' }
        ],
        awardGemNumber: [
          { required: true, message: '奖励的宝石数量不能为空', trigger: 'blur' }
        ],
        awardPropId: [
          { required: true, message: '奖励的道具id不能为空', trigger: 'blur' }
        ],
        awardPropNumber: [
          { required: true, message: '奖励的道具数量不能为空', trigger: 'blur' }
        ],
        awardSecondPropId: [
          { required: true, message: '第二个奖励的id不能为空', trigger: 'blur' }
        ],
        awardSecondPropNumber: [
          { required: true, message: '第二个物品的奖励数量不能为空', trigger: 'blur' }
        ],
        awardThirdPropId: [
          { required: true, message: '第三个奖励的道具id不能为空', trigger: 'blur' }
        ],
        awardThirdPropNumber: [
          { required: true, message: '第三个奖励的数量不能为空', trigger: 'blur' }
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
            `/mingxing/buff/${!this.dataForm.id ? 'save' : 'update'}`,
            {
              'id': this.dataForm.id || undefined,
              'name': this.dataForm.name,
              'summer': this.dataForm.summer,
              'type': this.dataForm.type,
              'needProcess': this.dataForm.needProcess,
              'taskId': this.dataForm.taskId,
              'awardGemNumber': this.dataForm.awardGemNumber,
              'awardPropId': this.dataForm.awardPropId,
              'awardPropNumber': this.dataForm.awardPropNumber,
              'awardSecondPropId': this.dataForm.awardSecondPropId,
              'awardSecondPropNumber': this.dataForm.awardSecondPropNumber,
              'awardThirdPropId': this.dataForm.awardThirdPropId,
              'awardThirdPropNumber': this.dataForm.awardThirdPropNumber
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
