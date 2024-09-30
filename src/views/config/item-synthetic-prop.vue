<template>
  <el-dialog
    title="配置"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="close"
  >
    <el-form label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-row v-for="(item, index) in syntheticProp" :key="index">
        <div style="display: flex">
          <el-select v-model="item[`productId`]" placeholder="请选择" multiple filterable>
            <el-option-group
              v-for="group in propList"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-option-group>
          </el-select>
          <el-input-number v-model="item[`probability`]" :precision="2" :step="0.01" :max="1" :min="0" />
          <el-button
            type="danger"
            size="small"
            @click="delNode(index)"
          >删除</el-button>
          <el-button
            v-if="index===syntheticProp.length-1"
            type="success"
            size="small"
            @click="addNode()"
          >新增</el-button>
        </div>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  props: {
    url: {
      type: String,
      require: true
    },
    rows: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      visible: true,
      finishedId: '',
      syntheticProp: [],
      propList: [],
      keyList: []
    }
  },
  methods: {
    init(id, propList) {
      this.propList = []

      const map = new Map(Object.entries(propList))
      map.forEach((value, key) => {
        this.propList.push({
          label: key,
          options: value
        })
      })
      this.finishedId = id
      this.getSyntheticProp()
    },
    close() {
      this.syntheticProp = []
      this.keyList = []
    },

    getSyntheticProp() {
      this.$api.get(`${this.url}${this.finishedId}`).then(res => {
        if (res.code === 200 && res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].productId.split(',').length > 0) {
              this.syntheticProp.push({
                'productId': res.data[i].productId.split(',').map(Number),
                'probability': res.data[i].probability
              })
            } else {
              this.syntheticProp.push({
                'productId': [Number.parseInt(res.data[i].productId)],
                'probability': res.data[i].probability
              })
            }
          }
        } else {
          this.addNode()
        }
        this.visible = true
      })
    },
    // 表单提交
    dataFormSubmit() {
      for (let i = 0; i < this.syntheticProp.length; i++) {
        if (this.syntheticProp[i].productId === null || this.syntheticProp[i].probability === null || this.syntheticProp[i].productId === undefined || this.syntheticProp[i].probability === undefined) {
          this.$message.error('请去除空白选项')
          return false
        }
      }
      this.$emit('configSubmit', this.syntheticProp, this.finishedId)
    },
    delNode(index) {
      if (this.syntheticProp.length === 1) {
        this.syntheticProp = []
        this.addNode()
        return false
      }
      this.syntheticProp.splice(index, 1)
    },
    addNode() {
      this.syntheticProp.push({
        'productId': [],
        'probability': 0
      }
      )
    }
  }
}
</script>
