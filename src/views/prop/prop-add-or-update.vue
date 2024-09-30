<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="道具名" prop="name">
        <el-input v-model="dataForm.name" placeholder="" />
      </el-form-item>
      <el-form-item label="简介" prop="summer">
        <el-input v-model="dataForm.summer" />
      </el-form-item>
      <el-form-item label="增加的活力值" prop="increaseVitalityValue">
        <el-input-number v-model="dataForm.increaseVitalityValue" />
      </el-form-item>
      <el-form-item label="增加的魔法数值" prop="increaseMagicValue">
        <el-input-number v-model="dataForm.increaseMagicValue" />
      </el-form-item>
      <el-form-item label="增加的经验值" prop="increaseExpValue">
        <el-input-number v-model="dataForm.increaseExpValue" />
      </el-form-item>
      <el-form-item label="活力值倍数" prop="multipleVitality">
        <el-input-number v-model="dataForm.multipleVitality" :precision="1" :step="0.1" :max="10" :min="0" />
      </el-form-item>
      <el-form-item label="魔力值倍数" prop="multipleMagic">
        <el-input-number v-model="dataForm.multipleMagic" :precision="1" :step="0.1" :max="10" :min="0" />
      </el-form-item>
      <el-form-item label="经验值倍数" prop="multipleExp">
        <el-input-number v-model="dataForm.multipleExp" :precision="1" :step="0.1" :max="10" :min="0" />
      </el-form-item>
      <el-form-item label="有效回合" prop="effectiveRound">
        <el-input-number v-model="dataForm.effectiveRound" />
      </el-form-item>
      <el-form-item label="生效时间/秒" prop="effectiveTime">
        <el-input-number v-model="dataForm.effectiveTime" />
      </el-form-item>
      <el-form-item label="购买价格" prop="gemNumber">
        <el-input-number v-model="dataForm.gemNumber" />
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
        increaseVitalityValue: '',
        increaseMagicValue: '',
        increaseExpValue: '',
        multipleVitality: '',
        multipleMagic: '',
        multipleExp: '',
        effectiveRound: '',
        effectiveTime: '',
        gemNumber: ''
      },
      dataRule: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        summer: [
          { required: true, message: '简介不能为空', trigger: 'blur' }
        ]

      },
      value: ''
    }
  },
  methods: {
    init(row) {
      if (row === undefined) {
        this.dataForm.id = 0
      } else {
        this.dataForm = row
      }

      this.visible = true
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$api.post(
            `prop/${!this.dataForm.id ? 'add' : 'update'}`,
            {
              'id': this.dataForm.id || undefined,
              'name': this.dataForm.name,
              'summer': this.dataForm.summer,
              'increaseVitalityValue': this.dataForm.increaseVitalityValue,
              'increaseMagicValue': this.dataForm.increaseMagicValue,
              'increaseExpValue': this.dataForm.increaseExpValue,
              'multipleVitality': this.dataForm.multipleVitality,
              'multipleMagic': this.dataForm.multipleMagic,
              'multipleExp': this.dataForm.multipleExp,
              'effectiveRound': this.dataForm.effectiveRound,
              'effectiveTime': this.dataForm.effectiveTime,
              'gemNumber': this.dataForm.gemNumber
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
