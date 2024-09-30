<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="食物名称" prop="foodName">
        <el-input v-model="dataForm.foodName" placeholder="食物名称" />
      </el-form-item>
      <el-form-item label="食物类型" prop="foodType">
        <el-input v-model="dataForm.foodType" placeholder="食物类型" />
      </el-form-item>
      <el-form-item label="食物热量" prop="energy">
        <el-input-number v-model="dataForm.energy" />
      </el-form-item>
      <el-form-item label="碳水化合物" prop="carbohydrate">
        <el-input-number v-model="dataForm.carbohydrate" :precision="2" />
      </el-form-item>
      <el-form-item label="脂肪" prop="fat">
        <el-input-number v-model="dataForm.fat" :precision="2" />
      </el-form-item>
      <el-form-item label="蛋白质" prop="protein">
        <el-input-number v-model="dataForm.protein" :precision="2" />
      </el-form-item>
      <el-form-item label="纤维素" prop="cellulose">
        <el-input-number v-model="dataForm.cellulose" :precision="2" />
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
        foodName: '',
        foodType: '',
        energy: '',
        carbohydrate: '',
        fat: '',
        protein: '',
        cellulose: ''
      },
      dataRule: {
        // source: [
        //   {required: true, message: '来源 0代表薄荷 1代表用户上传不能为空', trigger: 'blur'}
        // ],
        foodName: [
          { required: true, message: '食物名称不能为空', trigger: 'blur' }
        ],
        foodType: [
          { required: true, message: '食物类型不能为空', trigger: 'blur' }
        ],
        // totalImage: [
        //   {required: true, message: '总照片不能为空', trigger: 'blur'}
        // ],
        // bigImage: [
        //   {required: true, message: '大照片不能为空', trigger: 'blur'}
        // ],
        // smallImage: [
        //   {required: true, message: '小照片不能为空', trigger: 'blur'}
        // ],
        energy: [
          { required: true, message: '食物热量不能为空', trigger: 'blur' }
        ],
        carbohydrate: [
          { required: true, message: '碳水化合物不能为空', trigger: 'blur' }
        ],
        fat: [
          { required: true, message: '脂肪不能为空', trigger: 'blur' }
        ],
        protein: [
          { required: true, message: '蛋白质不能为空', trigger: 'blur' }
        ],
        cellulose: [
          { required: true, message: '纤维素不能为空', trigger: 'blur' }
        ]
        // vitaminA: [
        //   {required: true, message: '维生素a不能为空', trigger: 'blur'}
        // ],
        // vitaminC: [
        //   {required: true, message: '维生素c不能为空', trigger: 'blur'}
        // ],
        // vitaminE: [
        //   {required: true, message: '维生素e不能为空', trigger: 'blur'}
        // ],
        // carotene: [
        //   {required: true, message: '胡萝卜素不能为空', trigger: 'blur'}
        // ],
        // thiamine: [
        //   {required: true, message: '硫胺素不能为空', trigger: 'blur'}
        // ],
        // riboflavin: [
        //   {required: true, message: '核黄素不能为空', trigger: 'blur'}
        // ],
        // niacin: [
        //   {required: true, message: '烟酸不能为空', trigger: 'blur'}
        // ],
        // cholesterol: [
        //   {required: true, message: '胆固醇不能为空', trigger: 'blur'}
        // ],
        // magnesium: [
        //   {required: true, message: '镁不能为空', trigger: 'blur'}
        // ],
        // calcium: [
        //   {required: true, message: '钙不能为空', trigger: 'blur'}
        // ],
        // iron: [
        //   {required: true, message: '铁不能为空', trigger: 'blur'}
        // ],
        // zinc: [
        //   {required: true, message: '锌不能为空', trigger: 'blur'}
        // ],
        // copper: [
        //   {required: true, message: '铜不能为空', trigger: 'blur'}
        // ],
        // manganese: [
        //   {required: true, message: '锰不能为空', trigger: 'blur'}
        // ],
        // potassium: [
        //   {required: true, message: '钾不能为空', trigger: 'blur'}
        // ],
        // phosphorus: [
        //   {required: true, message: '磷不能为空', trigger: 'blur'}
        // ],
        // sodium: [
        //   {required: true, message: '钠不能为空', trigger: 'blur'}
        // ],
        // selenium: [
        //   {required: true, message: '硒不能为空', trigger: 'blur'}
        // ],
        // unit: [
        //   {required: true, message: '度量单位不能为空', trigger: 'blur'}
        // ],
        // createTime: [
        //   {required: true, message: '不能为空', trigger: 'blur'}
        // ],
        // updateTime: [
        //   {required: true, message: '不能为空', trigger: 'blur'}
        // ],
        // deleted: [
        //   {required: true, message: '不能为空', trigger: 'blur'}
        // ]
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
          foodName: '',
          foodType: '',
          energy: '',
          carbohydrate: '',
          fat: '',
          protein: '',
          cellulose: ''
        }
      }

      this.visible = true
    },
    // 表单提交
    dataFormSubmit() {
      this.$api.post(
        `food/${!this.dataForm.id ? 'save' : 'update'}`,
        this.dataForm
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
          this.$message.error(data.msg + '请检查批次号等级是否有重复')
        }
      })
    }
  }
}

</script>
