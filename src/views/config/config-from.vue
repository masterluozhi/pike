<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-form :model="afConfigModel" label-width="80px" @keyup.enter.native="submitAf()">
          <el-form-item label="不运动">
            <el-input-number v-model="afConfigModel.a" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="正常运动">
            <el-input-number v-model="afConfigModel.b" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="规律运动">
            <el-input-number v-model="afConfigModel.c" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="经常运动">
            <el-input-number v-model="afConfigModel.d" :min="0" :precision="2" />
          </el-form-item>
          <el-button type="primary" style="margin-left: 70%" @click="submitAf()">确定</el-button>
        </el-form>

      </el-col>
      <el-col :span="6">
        <el-form :model="BMRConfigModel" label-width="80px" @keyup.enter.native="submitBMR()">
          <el-form-item label="体重" prop="name">
            <el-input-number v-model="BMRConfigModel.weight" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="身高" prop="exp">
            <el-input-number v-model="BMRConfigModel.height" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="BMRConfigModel.age" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="女性平衡值" min="0">
            <el-input-number v-model="BMRConfigModel.womenBalance" :precision="2" />
          </el-form-item>
          <el-form-item label="男性平衡值" min="0">
            <el-input-number v-model="BMRConfigModel.menBalance" :precision="2" />
          </el-form-item>
          <el-button type="primary" style="margin-left: 70%" @click="submitBMR()">确定</el-button>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-form :model="threeMajorRatioConfigModel" label-width="80px" @keyup.enter.native="submitThreeMajor()">
          <el-form-item label="碳水化合物">
            <el-col>
              <el-input-number v-model="threeMajorRatioConfigModel.minCarbohydrate" :min="0" :precision="2" placeholder="最小" />
            </el-col>
            <el-col>
              <el-input-number v-model="threeMajorRatioConfigModel.maxCarbohydrate" :min="0" :precision="2" placeholder="最大" />
            </el-col>
          </el-form-item>
          <el-form-item label="蛋白质">
            <el-col>
              <el-input-number v-model="threeMajorRatioConfigModel.minProtein" :min="0" :precision="2" />
            </el-col>
            <el-col>
              <el-input-number v-model="threeMajorRatioConfigModel.maxProtein" :min="0" :precision="2" />
            </el-col>
          </el-form-item>
          <el-form-item label="脂肪">
            <el-col>
              <el-input-number v-model="threeMajorRatioConfigModel.minFat" :min="0" :precision="2" />
            </el-col>
            <el-col>
              <el-input-number v-model="threeMajorRatioConfigModel.maxFat" :min="0" :precision="2" />
            </el-col>
          </el-form-item>
          <el-button type="primary" style="margin-left: 70%" @click="submitThreeMajor()">确定</el-button>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-form :model="mealRatioConfigModel" label-width="80px" @keyup.enter.native="submitMealRatio()">
          <el-form-item label="早餐">
            <el-input-number v-model="mealRatioConfigModel.breakFast" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="早餐加餐">
            <el-input-number v-model="mealRatioConfigModel.breakFastPlus" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="午餐">
            <el-input-number v-model="mealRatioConfigModel.lunch" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="午餐加餐">
            <el-input-number v-model="mealRatioConfigModel.lunchPlus" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="晚餐">
            <el-input-number v-model="mealRatioConfigModel.dinner" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="晚餐加餐">
            <el-input-number v-model="mealRatioConfigModel.dinnerPlus" :min="0" :precision="2" />
          </el-form-item>
          <el-button type="primary" style="margin-left: 70%" @click="submitMealRatio()">确定</el-button>
        </el-form>
      </el-col>
    </el-row>

  </div>

</template>
<script>

export default {
  data() {
    return {
      visible: false,
      extra: '额外的',
      afConfigModel: {
        a: 0,
        b: 0,
        c: 0,
        d: 0
      },
      mealRatioConfigModel: {
        breakFast: 0,
        breakFastPlus: 0,
        lunch: 0,
        lunchPlus: 0,
        dinner: 0,
        dinnerPlus: 0
      },
      BMRConfigModel: {
        weight: 0,
        height: 0,
        age: 0,
        womenBalance: 0,
        menBalance: 0
      },
      threeMajorRatioConfigModel: {
        minCarbohydrate: 0,
        minProtein: 0,
        minFat: 0,
        maxCarbohydrate: 0,
        maxProtein: 0,
        maxFat: 0
      }
    }
  },
  created() {
    this.getAfConfigModel()
    this.getMealRatioConfigModel()
    this.getBMRConfigModel()
    this.getThreeMajorRatioConfigModel()
  },
  methods: {
    getAfConfigModel() {
      this.$api.get('config/getAfConfigModel').then(res => {
        if (res.code === 200) {
          this.afConfigModel = res.data
        }
      })
    },
    getMealRatioConfigModel() {
      this.$api.get('config/getMealRatioConfigModel').then(res => {
        if (res.code === 200) {
          this.mealRatioConfigModel = res.data
        }
      })
    },
    getBMRConfigModel() {
      this.$api.get('config/getBMRConfigModel').then(res => {
        if (res.code === 200) {
          this.BMRConfigModel = res.data
        }
      })
    },
    getThreeMajorRatioConfigModel() {
      this.$api.get('config/getThreeMajorRatioConfigModel').then(res => {
        if (res.code === 200) {
          this.threeMajorRatioConfigModel = res.data
        }
      })
    },
    submitAf() {
      this.$api.post('config/putAfConfigModel', this.afConfigModel).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
        }
      })
    },
    submitBMR() {
      this.$api.post('config/putBMRConfigModel', this.BMRConfigModel).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
        }
      })
    },
    submitThreeMajor() {
      this.$api.post('config/putThreeMajorRatioConfigModel', this.threeMajorRatioConfigModel).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
        }
      })
    },
    submitMealRatio() {
      this.$api.post('config/putMealRatioConfigModel', this.mealRatioConfigModel).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">

</style>
