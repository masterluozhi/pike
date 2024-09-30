<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="达人名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="" />
      </el-form-item>
      <el-form-item label="等级" prop="level">
        <el-input v-model="dataForm.level" placeholder="" />
      </el-form-item>
      <el-form-item v-if="!dataForm.id" label="批次号" prop="level">
        <el-select v-model="dataForm.sequenceId" placeholder="请选择">
          <el-option
            v-for="item in talentSequenceIds"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
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
        level: '',
        sequenceId: ''
      },
      talentSequenceIds: [],
      dataRule: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(obj) {
      if (obj) {
        this.dataForm = obj
      } else {
        this.dataForm = {
          id: 0,
          name: '',
          level: '',
          sequenceId: ''
        }
      }
      this.getTalentSequenceIds()
    },
    getTalentSequenceIds() {
      this.$api.get('AT/talentSequenceIds').then(
        res => {
          this.talentSequenceIds = res.data
          this.talentSequenceIds.push('新增')
          this.visible = true
        }
      )
    },
    // 表单提交
    dataFormSubmit() {
      this.$api.postWWW(
        `AT/${!this.dataForm.id ? 'saveTalent' : 'updateTalent'}`,
        {
          'id': this.dataForm.id || undefined,
          'name': this.dataForm.name,
          'level': this.dataForm.level,
          'sequenceId': this.dataForm.sequenceId === '新增' ? undefined : this.dataForm.sequenceId
        }
      ).then(({ data }) => {
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
          this.$message.error(data.msg + '请检查批次号等级是否有重复')
        }
      })
    }
  }
}
</script>
