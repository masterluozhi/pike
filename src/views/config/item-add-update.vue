<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="元素id" prop="id">
        <el-input v-model="dataForm.id" placeholder="" />
      </el-form-item>
      <el-form-item label="元素名" prop="name">
        <el-input v-model="dataForm.name" placeholder="" />
      </el-form-item>
      <el-form-item label="板块" prop="section">
        <el-select v-model="dataForm.section" placeholder="请选择">
          <el-option
            v-for="item in section()"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="序列" prop="sequence">
        <el-select v-model="dataForm.sequence" placeholder="请选择">
          <el-option
            v-for="item in sequence()"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="元素类型" prop="type">
        <el-select v-model="dataForm.type" placeholder="请选择">
          <el-option
            v-for="item in type()"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="次级元素" prop="secondary">
        <el-input v-model="dataForm.secondary" placeholder="" />
      </el-form-item>
      <el-form-item label="发射元素" prop="productIds">
        <el-input v-model="dataForm.productIds" placeholder="" />
      </el-form-item>
      <el-form-item label="发射元素概率" prop="productProbability">
        <el-input v-model="dataForm.productProbability" placeholder="" />
      </el-form-item>

      <el-form-item label="每轮产出量" prop="roundNumber">
        <el-input-number v-model="dataForm.roundNumber" placeholder="" :min="0" />
      </el-form-item>
      <el-form-item label="可出产轮次" prop="round">
        <el-input-number v-model="dataForm.round" placeholder="" :min="0" />
      </el-form-item>
      <el-form-item label="每轮CD时间" prop="roundCd">
        <el-input-number v-model="dataForm.roundCd" placeholder="" :min="0" />
      </el-form-item>
      <el-form-item label="解锁时间/秒" prop="unlockTime">
        <el-input-number v-model="dataForm.unlockTime" placeholder="" :min="0" />
      </el-form-item>
      <el-form-item label="消费能量" prop="energyConsume">
        <el-input-number v-model="dataForm.energyConsume" placeholder="" :min="0" />
      </el-form-item>
      <el-form-item label="开启能量" prop="openIds">
        <el-input v-model="dataForm.openIds" placeholder="" />
      </el-form-item>
      <el-form-item label="转换能量" prop="conversionIds">
        <el-input v-model="dataForm.conversionIds" placeholder="" />
      </el-form-item>
      <el-form-item label="合成元素" prop="synthesisIds">
        <el-input v-model="dataForm.synthesisIds" placeholder="" />
      </el-form-item>
      <el-form-item label="合成元素概率" prop="synthesisProbability">
        <el-input v-model="dataForm.synthesisProbability" placeholder="" />
      </el-form-item>
      <el-form-item label="道具类型效果" prop="effectType">
        <el-input v-model="dataForm.effectType" placeholder="" />
      </el-form-item>
      <el-form-item label="道具数量" prop="effectNumber">
        <el-input v-model="dataForm.effectNumber" placeholder="" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="" />
      </el-form-item>
      <el-form-item label="元素说明" prop="description">
        <el-input v-model="dataForm.description" placeholder="" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { sequence, section, type } from '@/constant/itemConstant'

export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: '',
        sort: '',
        section: '',
        sequence: '',
        secondary: '',
        type: '',
        roundNumber: '',
        energyConsume: '',
        roundCd: '',
        unlockTime: '',
        productIds: '',
        productProbability: '',
        round: '',
        openIds: '',
        conversionIds: '',
        synthesisIds: '',
        synthesisProbability: '',
        effectType: '',
        effectNumber: '',
        remark: '',
        description: ''
      },
      dataRule: {
        id: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        section: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sequence: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        roundNumber: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        energyConsume: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        roundCd: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        unlockTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    type() {
      return type
    },
    sequence() {
      return sequence
    },
    section() {
      return section
    },
    init(obj) {
      if (obj === undefined) {
        this.dataForm = {
          id: '',
          name: '',
          sort: '',
          section: '',
          sequence: '',
          secondary: '',
          type: '',
          roundNumber: '',
          energyConsume: '',
          roundCd: '',
          unlockTime: '',
          productIds: '',
          productProbability: '',
          round: '',
          openIds: '',
          conversionIds: '',
          synthesisIds: '',
          synthesisProbability: '',
          effectType: '',
          effectNumber: '',
          remark: '',
          description: ''
        }
      } else {
        this.dataForm = obj
      }

      this.visible = true
    },
    // 表单提交
    dataFormSubmit() {
      this.$api.post('item/addOrUpdateItem',
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
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>
