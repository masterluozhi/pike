
<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" label-position="top" label-width="100px">
      <el-form-item label="你最希望改善哪些方面" prop="createTime">
        <el-checkbox-group v-model="dataForm.improvements">
          <el-checkbox label="A">A.身材</el-checkbox>
          <el-checkbox label="B">B.皮肤状态</el-checkbox>
          <el-checkbox label="C">C.大脑健康</el-checkbox>
          <el-checkbox label="D">D.生活习惯</el-checkbox>
          <el-checkbox label="E">E.睡眠</el-checkbox>
          <el-checkbox label="F">F.情绪</el-checkbox>
          <el-checkbox label="G">G.脑力提升</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="你希望每天运动多久" prop="updateTime">
        <el-select v-model="dataForm.dailyExercise" placeholder="请选择">
          <el-option
            v-for="item in dailyExerciseOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="你有在服用保健品或者药物吗" prop="deleted">
        <el-select v-model="dataForm.hasTakingSupplement" placeholder="请选择">
          <el-option
            v-for="item in hasTakingSupplementOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="你平时会感到心情低落吗？" prop="deleted">
        <el-select v-model="dataForm.moodStatus" placeholder="请选择">
          <el-option
            v-for="item in moodOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="你平时会感到紧张、焦虑或烦躁吗？" prop="deleted">
        <el-select v-model="dataForm.anxietyStatus" placeholder="请选择">
          <el-option
            v-for="item in moodOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="你的出生日期？" prop="birthDate">
        <el-date-picker
          v-model="dataForm.birthDate"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="你的身高是多少？" prop="deleted">
        <el-input-number v-model="dataForm.height" placeholder="" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input v-model="dataForm.gender" />
      </el-form-item>
      <el-form-item label="你的体重是多少？(KG)" prop="deleted">
        <el-input-number v-model="dataForm.weight" placeholder="" />
      </el-form-item>
      <el-form-item label="你的学业情况是？" prop="deleted">
        <el-select v-model="dataForm.educationLevel" placeholder="请选择">
          <el-option
            v-for="item in educationOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="update()">确认</el-button>
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script >

export default {
  data() {
    return {
      dataForm: {
        improvements: [],
        birthDate: '',
        dailyExercise: '',
        anxietyStatus: '',
        educationLevel: '',
        gender: '',
        hasTakingSupplement: '',
        height: '',
        weight: '',
        moodStatus: ''
      },
      dailyExerciseOption: [{
        value: 'A',
        label: 'A.生命在于静止'
      }, {
        value: 'B',
        label: 'B.5-15分钟'
      }, {
        value: 'C',
        label: 'C.15-30分钟'
      }, {
        value: 'D',
        label: 'D.30分钟以上'
      }],
      hasTakingSupplementOption: [
        {
          value: true,
          label: '有'
        }, {
          value: false,
          label: '无'
        }
      ],
      moodOption: [{
        value: 'A',
        label: 'A.完全不会'
      }, {
        value: 'B',
        label: 'B.偶尔'
      }, {
        value: 'C',
        label: 'C.一半以上日子'
      }, {
        value: 'D',
        label: 'D.几乎每天'
      }],
      educationOption: [
        {
          value: 'A',
          label: 'A.不告诉你'
        }, {
          value: 'B',
          label: 'B.高中及以下'
        }, {
          value: 'C',
          label: 'C.大专'
        }, {
          value: 'D',
          label: 'D.本科'
        },
        {
          value: 'E',
          label: 'D.硕士'
        },
        {
          value: 'F',
          label: 'D.博士'
        }
      ],
      visible: false
    }
  },

  methods: {
    update() {
      this.$api.post(
        `user/updateHealthSurveyData`,
        {
          'id': this.dataForm.id,
          'improvements': this.dataForm.improvements.join(','),
          'birthDate': this.dataForm.birthDate,
          'dailyExercise': this.dataForm.dailyExerciseOption,
          'anxietyStatus': this.dataForm.anxietyStatus,
          'educationLevel': this.dataForm.educationLevel,
          'gender': this.dataForm.gender,
          'hasTakingSupplement': this.dataForm.hasTakingSupplement,
          'height': this.dataForm.height,
          'weight': this.dataForm.weight,
          'moodStatus': this.dataForm.moodStatus
        }

      ).then(res => {
        if (res && res.code === 200) {
          this.visible = false
        }
      }
      )
    },
    init(id) {
      this.dataForm.id = id || 0
      this.$api.get(
        `user/getUserHealthSurveyData/${id}`
      ).then(res => {
        if (res && res.code === 200) {
          if (res.data == null) {
            this.$message.info('暂无信息')
            return false
          }
          this.dataForm.id = res.data.id
          this.dataForm.improvements = res.data.improvements.split(',')
          this.dataForm.birthDate = res.data.birthDate
          this.dataForm.dailyExercise = res.data.dailyExercise
          this.dataForm.anxietyStatus = res.data.anxietyStatus
          this.dataForm.educationLevel = res.data.educationLevel
          this.dataForm.gender = res.data.gender
          this.dataForm.hasTakingSupplement = res.data.hasTakingSupplement
          this.dataForm.height = res.data.height
          this.dataForm.weight = res.data.weight
          this.dataForm.moodStatus = res.data.moodStatus
          this.visible = true
        }
      })
    }
  }
}
</script>
