<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="80px"
      @keyup.enter.native="dataFormSubmit()"
    >
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model="dataForm.taskName" placeholder="任务名称" />
      </el-form-item>
      <el-form-item v-if="parent" label="任务类型" prop="taskType">
        <el-radio-group v-model="dataForm.taskType">
          <el-radio :label="1">普通任务</el-radio>
          <el-radio :label="2">宝箱</el-radio>
          <el-radio :label="3">决斗</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关卡介绍" prop="taskSummer">
        <el-input v-model="dataForm.taskSummer" placeholder="任务总结" />
      </el-form-item>
      <el-form-item label="任务排序" prop="sort">
        <el-input-number v-model="dataForm.sort" placeholder="任务排序" :min="0" />
      </el-form-item>
      <el-form-item label="分数" prop="score">
        <el-input-number v-model="dataForm.score" :min="0" :precision="2" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

import { Message } from 'element-ui'

export default {
  data() {
    return {
      visible: false,
      parent: {},
      dataForm: {
        id: 0,
        taskName: '',
        taskSummer: '',
        score: 0,
        pid: 0,
        router: '0',
        taskType: 0
      },
      mode: 'update',
      dataRule: {
        taskName: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' }
        ],
        taskSummer: [
          { required: true, message: '任务总结不能为空', trigger: 'blur' }
        ],
        background: [
          { required: true, message: '背景图不能为空', trigger: 'blur' }
        ],
        taskType: [
          { required: true, message: '任务时间类型不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '任务时间类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    update(data) {
      this.parent = data
      if (data) {
        this.dataForm = {
          id: data.id,
          taskName: data.taskName,
          taskSummer: data.taskSummer,
          score: data.score,
          sort: data.sort,
          router: data.router,
          taskType: data.type,
          pid: data.pid
        }
        if (data.type !== 2 || data.type !== 3) {
          this.dataForm.taskType = 1
        }
      }
      this.visible = true
    },
    add(row) {
      this.dataForm = {
        id: undefined,
        taskName: '',
        taskSummer: '',
        score: 0,
        pid: 0,
        router: '0',
        taskType: 0
      }
      this.parent = row
      this.mode = 'add'
      if (row.type === 4 || row.type === 2 || row.type === 3) {
        Message({
          message: '无法再增加层级',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      this.visible = true
    },
    addChapter() {
      this.dataForm = {
        id: undefined,
        taskName: '',
        taskSummer: '',
        score: 0,
        pid: 0,
        router: '0',
        taskType: 0
      }
      this.mode = 'addChapter'
      this.visible = true
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let taskType = 0
          if (this.mode === 'addChapter') {
            const pid = 0
            const router = '0'
            taskType = 0
            this.save(pid, router, taskType)
          }
          if (this.mode === 'update') {
            taskType = this.getTaskType()
            this.updateApi(taskType)
          }
          if (this.mode === 'add') {
            const pid = this.parent.id
            const router = this.parent.pid + ',' + this.parent.id
            taskType = this.getTaskType()
            this.save(pid, router, taskType)
          }
        }
      })
    },
    getTaskType() {
      if (this.dataForm.taskType === 1 && this.parent.type === 0) {
        return 1
      }
      if (this.dataForm.taskType === 1 && this.parent.type === 1) {
        return 4
      }
      if (this.dataForm.taskType !== 1) {
        return this.dataForm.taskType
      }
    },
    save(pid, router, taskType) {
      console.log(taskType)
      console.log(this.mode)
      this.$api.post(
        `/task/saveNodeTask`,
        {
          'id': this.dataForm.id || undefined,
          'taskName': this.dataForm.taskName,
          'taskSummer': this.dataForm.taskSummer,
          'pid': pid,
          'router': router,
          'score': this.dataForm.score,
          'type': taskType,
          'sort': this.dataForm.sort
        }
      ).then(res => {
        if (res && res.code === 200) {
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
    },
    updateApi(taskType) {
      this.$api.post(
        `/task/updateNodeTask`,
        {
          'id': this.dataForm.id || undefined,
          'taskName': this.dataForm.taskName,
          'taskSummer': this.dataForm.taskSummer,
          'score': this.dataForm.score,
          'type': taskType,
          'sort': this.dataForm.sort
        }
      ).then(res => {
        if (res && res.code === 200) {
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
