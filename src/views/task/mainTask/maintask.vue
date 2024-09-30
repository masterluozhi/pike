<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="taskName"
        label="关卡名称"
        sortable
      />
      <el-table-column
        prop="taskSummer"
        label="关卡介绍"
        sortable
      />
      <el-table-column
        prop="score"
        label="得分"
        sortable
      />
      <el-table-column
        prop="sort"
        label="顺序"
        sortable
      />
      <el-table-column
        label="操作"
      >
        <template slot="header" slot-scope="scope">
          <el-button type="primary" size="small" @click="addChapterHandle()">新增章
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="small" :class="buttonColor(scope.row)" @click="updateHandle(scope.row)">编辑
          </el-button>
          <el-button type="text" size="small" :class="buttonColor(scope.row)" @click="addHandle(scope.row)">新增子节点
          </el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>
<script>
import AddOrUpdate from '@/views/task/mainTask/mainTask-add-or-update'

export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      addOrUpdateVisible: false,
      tableData: []
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    buttonColor(obj) {
      if (obj.router === '') {
        return 'red-button'
      } else if (obj.router.split(',').length === 1) {
        return 'green-button'
      } else {
        return 'blue-button'
      }
    },
    getDataList() {
      this.$api.get('task/tree').then(res => {
        this.tableData = res.data
      })
    },
    deleteHandle(row) {
      // 判断该节点是否有子节点
      console.log(row)
      if (row.children && row.children.length > 0) {
        this.$message({
          message: '该节点下存在子节点，不允许直接删除',
          type: 'warning'
        })
        return
      }
      this.$confirm('是否确认删除此节点?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(row.id)
      })
    },
    del(id) {
      this.$api.del(`task/delNodeTask/${id}`).then(res => {
        this.$message.success('删除完成')
        this.getDataList()
      }
      )
    },
    updateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.update(row)
      })
    },
    addHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.add(row)
      })
    },
    addChapterHandle() {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.addChapter()
      })
    }
  }
}
</script>
<style>
/* 样式文件 */
.red-button {
  color: red;
}

.green-button {
  color: green;
}

.blue-button {
  color: blue;
}
</style>

