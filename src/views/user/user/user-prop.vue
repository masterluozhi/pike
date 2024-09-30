
<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      style="width: 100%;"
    >
      <el-table-column
        label="编号"
        type="index"
        width="50"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ (pageIndex - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="propName"
        header-align="center"
        align="center"
        label="名称"
      />
      <el-table-column
        prop="propNumber"
        header-align="center"
        align="center"
        label="数量"
      />
    </el-table>
    <el-pagination
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    />

  </el-dialog>
</template>

<script >
export default {
  data() {
    return {
      dataForm: {},
      userId: 0,
      visible: false,
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },

  methods: {
    getDataList() {
      this.dataListLoading = true
      this.$api.page(
        `user/userPropPage`,
        {
          'current': this.pageIndex,
          'pageSize': this.pageSize,
          'propName': this.dataForm.name,
          'userId': this.userId
        }
      ).then(res => {
        if (res && res.code === 200) {
          this.dataList = res.data.records
          this.totalPage = res.data.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
        this.visible = true
      })
    },
    init(id) {
      this.dataForm.id = id || 0
      this.userId = id
      this.getDataList()
    },
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    }

  }
}
</script>
