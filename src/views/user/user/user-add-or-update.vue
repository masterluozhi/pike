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
        <el-input-number v-model="dataForm.exp" placeholder="" />
      </el-form-item>
      <el-form-item label="连胜天数" prop="winningDays">
        <el-input-number v-model="dataForm.winningDays" placeholder="" />
      </el-form-item>
      <el-form-item label="优秀魔法页数" prop="magicPageExcellent">
        <el-input-number v-model="dataForm.magicPageExcellent" placeholder="" />
      </el-form-item>
      <el-form-item label="完美魔法页数" prop="magicPagePerfect">
        <el-input-number v-model="dataForm.magicPagePerfect" placeholder="" />
      </el-form-item>
      <el-form-item label="传奇魔法页数" prop="magicPageLegend">
        <el-input-number v-model="dataForm.magicPageLegend" placeholder="" />
      </el-form-item>
      <el-form-item label="自拍次数" prop="photoCount">
        <el-input-number v-model="dataForm.photoCount" placeholder="" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit">确认</el-button>
      <el-button @click="visible = false">取消</el-button>
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
        winningDays: 0,
        exp: 0,
        magicPageExcellent: 0,
        magicPageLegend: 0,
        magicPagePerfect: 0,
        photoCount: 0
      }

    }
  },
  methods: {
    init(obj) {
      this.dataForm = obj
      this.visible = true
    },
    dataFormSubmit() {
      this.$api.post(
        `user/updateUser`,
        this.dataForm
      ).then(res => {
        if (res && res.code === 200) {
          this.$message.success('修改中国')
          this.visible = false
        }
      })
    }
  }
}
</script>
