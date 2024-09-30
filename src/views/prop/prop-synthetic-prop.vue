<template>
  <el-dialog
    title="合成"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close="close"
  >
    <el-form label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-row v-for="(item, index) in syntheticProp" :key="index">
        <div style="display: flex">
          <div v-for="(type, index) in typeList" :key="index">
            <el-select v-if="type==='select'" v-model="item[keyList[index]]" placeholder="请选择">
              <el-option
                v-for="item in propList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <el-input-number v-if="type==='number'" v-model="item[keyList[index]]" :min="1" />
            <el-input-number v-if="type==='double'" v-model="item[keyList[index]]" :precision="1" :step="0.1" :max="10" :min="0" />
          </div>
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
      typeList: [],
      keyList: []
    }
  },
  methods: {
    init(id, propList) {
      this.rowhandle(this.rows)
      this.propList = propList
      this.finishedId = id
      this.getSyntheticProp()
    },
    close() {
      this.syntheticProp = []
      this.typeList = []
      this.keyList = []
    },
    rowhandle(rows) {
      for (const key in rows) {
        this.typeList.push(rows[key])
        this.keyList.push(key)
      }
      this.addNode()
    },
    getSyntheticProp() {
      this.$api.get(`${this.url}${this.finishedId}`).then(res => {
        if (res.code === 200 && res.data.length > 0) {
          this.syntheticProp = res.data
        }
        this.visible = true
      })
    },
    // 表单提交
    dataFormSubmit() {
      for (let i = 0; i < this.syntheticProp.length; i++) {
        if (this.syntheticProp[i].syntheticPropId === null) {
          this.$message.error('请去除空白选项')
          return false
        }
        if (i > 0 && this.syntheticProp.indexOf(this.syntheticProp[i].syntheticPropId) !== i) {
          this.$message.error('请不要重复选项')
          return false
        }
      }
      this.$emit('configSubmit', this.syntheticProp, this.finishedId)
    },
    delNode(index) {
      if (this.syntheticProp.length === 1) {
        this.$message.error('至少保留一个合成项')
        return false
      }
      this.syntheticProp.splice(index, 1)
    },
    addNode() {
      const item = {}
      for (let i = 0; i < this.keyList; i++) {
        item[this.keyList[i]] = ''
      }
      this.syntheticProp.push(item)
    }
  }
}
</script>
