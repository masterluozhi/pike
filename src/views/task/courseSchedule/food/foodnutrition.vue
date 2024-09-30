<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="参数名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
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
        prop="foodName"
        header-align="center"
        align="center"
        label="食物名称"
      />
      <el-table-column
        prop="foodType"
        header-align="center"
        align="center"
        label="食物类型"
      />

      <el-table-column
        prop="energy"
        header-align="center"
        align="center"
        label="食物热量"
      />
      <el-table-column
        prop="carbohydrate"
        header-align="center"
        align="center"
        label="碳水化合物"
      />
      <el-table-column
        prop="fat"
        header-align="center"
        align="center"
        label="脂肪"
      />
      <el-table-column
        prop="protein"
        header-align="center"
        align="center"
        label="蛋白质"
      />
      <el-table-column
        prop="cellulose"
        header-align="center"
        align="center"
        label="纤维素"
      />
      <!--      <el-table-column-->
      <!--        prop="vitaminA"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="维生素a">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="vitaminC"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="维生素c">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="vitaminE"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="维生素e">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="carotene"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="胡萝卜素">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="thiamine"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="硫胺素">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="riboflavin"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="核黄素">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="niacin"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="烟酸">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="cholesterol"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="胆固醇">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="magnesium"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="镁">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="calcium"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="钙">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="iron"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="铁">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="zinc"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="锌">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="copper"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="铜">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="manganese"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="锰">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="potassium"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="钾">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="phosphorus"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="磷">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="sodium"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="钠">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="selenium"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="硒">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="unit"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="度量单位">-->
      <!--      </el-table-column>-->
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './foodnutrition-add-or-update'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        name: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$api.page('food/page',
        {
          current: this.pageIndex,
          pageSize: this.pageSize,
          name: this.dataForm.name
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
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },

    // 新增 / 修改
    addOrUpdateHandle(obj) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(obj)
      })
    },
    deleteHandle(id) {
      this.$api.del(`/food/del/${id}`).then(res => {
        this.$message.info('删除成功')
        this.getDataList()
      })
    }
  }
}
</script>
