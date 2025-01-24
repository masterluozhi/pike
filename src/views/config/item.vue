<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="参数名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button type="primary" @click="updateExcel()">上传excel配置表更新</el-button>
        <el-dialog
          title="上传文件"
          :close-on-click-modal="false"
          width="40%"
          :visible.sync="isUp"
        >
          <el-upload
            ref="upload"
            style="margin-left: 15%"
            drag
            action=""
            :limit="1"
            :http-request="uploadFile"
            :auto-upload="false"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="noUp">取消</el-button>
            <el-button type="primary" size="small" @click="handDown()">下载配置表</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip" style="color: red">
              提示：仅允许导入“xlsx”格式文件！
            </div>
          </span>
        </el-dialog>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      v-horizontal-scroll="'always'"
      :data="dataList"
      border
      style="width: 100%;"
    >
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="元素id"
      />
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="元素名"
      />
      <el-table-column
        prop="level"
        header-align="center"
        align="center"
        label="元素等级"
      />
      <el-table-column
        prop="section"
        header-align="center"
        align="center"
        label="版块"
      />
      <el-table-column
        prop="sequence"
        header-align="center"
        align="center"
        label="序列"
      />
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="元素类型"
      />
      <el-table-column
        prop="secondary"
        header-align="center"
        align="center"
        label="次级元素"
      />
      <el-table-column
        prop="productIds"
        header-align="center"
        align="center"
        label="发射元素"
      />
      <el-table-column
        prop="productProbability"
        header-align="center"
        align="center"
        label="发射元素概率"
      />
      <el-table-column
        prop="roundNumber"
        header-align="center"
        align="center"
        label="每轮产出量"
      />
      <el-table-column
        prop="round"
        header-align="center"
        align="center"
        label="可出产轮次"
      />
      <el-table-column
        prop="roundCd"
        header-align="center"
        align="center"
        label="每轮CD时间"
      />
      <el-table-column
        prop="unlockTime"
        header-align="center"
        align="center"
        label="解锁时间（秒）"
      />
      <el-table-column
        prop="energyConsume"
        header-align="center"
        align="center"
        label="消费能量"
      />
      <el-table-column
        prop="openIds"
        header-align="center"
        align="center"
        label="开启元素"
      />
      <el-table-column
        prop="conversionIds"
        header-align="center"
        align="center"
        label="转化元素"
      />
      <el-table-column
        prop="synthesisIds"
        header-align="center"
        align="center"
        label="合成产出元素"
      />
      <el-table-column
        prop="synthesisProbability"
        header-align="center"
        align="center"
        label="合成产出元素概率"
      />
      <el-table-column
        prop="effectType"
        header-align="center"
        align="center"
        label="道具效果类型"
      />
      <el-table-column
        prop="effectNumber"
        header-align="center"
        align="center"
        label="道具数量"
      />
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        label="备注"
      />
      <el-table-column
        prop="typeDesc"
        header-align="center"
        align="center"
        label="序列简介"
      />
      <el-table-column
        prop="elementDesc"
        header-align="center"
        align="center"
        label="元素说明"
      />
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" />
  </div>
  <!-- 弹窗, 新增 / 修改 -->

</template>

<script>
import SyntheticItem from './item-synthetic-prop'
import AddOrUpdate from './item-add-update.vue'
import upload from '@/views/qiniu/upload.vue'
export default {
  components: {
    upload,
    AddOrUpdate,
    SyntheticItem
  },
  data() {
    return {
      apiBase: process.env.VUE_APP_BASE_API,
      isUp: false,
      dataForm: {
        name: ''
      },
      pageIndex: 1,
      pageSize: 100,
      totalPage: 0,
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      syntheticVisible: false,
      productVisible: false,
      itemList: [],
      productRows: {
        'productId': 'select',
        'probability': 'double'
      }

    }
  },
  created() {
    this.getDataList()
  },

  methods: {
    getItemList(select, id) {
      this.$api.get(
        'item/itemList'
      ).then(res => {
        if (res && res.code === 200) {
          this.itemList = res.data
          if (select === 'product') {
            this.$nextTick(() => {
              this.$refs.product.init(id, this.itemList)
            })
          } else {
            this.$nextTick(() => {
              this.$refs.synthetic.init(id, this.itemList)
            })
          }
        }
      })
    },
    product(id) {
      this.productVisible = true
      if (this.itemList.length === 0) {
        this.getItemList('product', id)
      } else {
        this.$nextTick(() => {
          this.$refs.product.init(id, this.itemList)
        })
      }
    },
    synthetic(id) {
      this.syntheticVisible = true
      if (this.itemList.length === 0) {
        this.getItemList('synthetic', id)
      } else {
        this.$nextTick(() => {
          this.$refs.synthetic.init(id, this.itemList)
        })
      }
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$api.page(
        'item/page',
        {
          'current': this.pageIndex,
          'pageSize': this.pageSize,
          'name': this.dataForm.name
        }
      ).then(res => {
        if (res && res.code === 200) {
          this.dataList = res.data.records
          this.totalPage = res.data.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
      })
      this.dataListLoading = false
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
    addOrUpdateHandle(row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row)
      })
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`确定 '删除'?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.del(
          `/item/del/delete/${id}`
        ).then(res => {
          if (res && res.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    //
    syntheticSumbit(syntheticProp, finishedPropId) {
      let flag = true
      if (syntheticProp[0].productId === undefined || syntheticProp[0].productId === null) {
        flag = false
      }
      this.$api.post(
        'item/addBatchSynthetic',
        {
          itemId: finishedPropId,
          productList: flag ? syntheticProp : null
        }
      ).then(res => {
        this.$message.success('操作成功')
        this.syntheticVisible = false
      })
    },
    productSumbit(syntheticProp, finishedPropId) {
      let flag = true
      if (syntheticProp[0].productId === undefined || syntheticProp[0].productId === null) {
        flag = false
      }
      this.$api.post(
        'item/addBatchProduct',
        {
          itemId: finishedPropId,
          productList: flag ? syntheticProp : null
        }
      ).then(res => {
        this.$message.success('操作成功')
        this.productVisible = false
      })
    },

    updateExcel() {
      this.isUp = true
    },
    noUp() {
      this.$refs.upload.clearFiles()
      this.isUp = false
    },
    submitUpload() {
      this.$confirm(`确定上传文件到服务器?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.upload.submit()
      })
    },
    uploadFile(item) {
      const FormDatas = new FormData()
      FormDatas.append('file', item.file)
      this.$api.file(`/item/uploadExcel`, FormDatas).then(res => {
        if (res.code === 200) {
          this.isUp = false
        }
        this.$refs.upload.clearFiles()
        this.getDataList()
      })
    },
    handDown() {
      const a = document.createElement('a') // 创建一个a元素
      a.href = 'https://roulin.oss-cn-shenzhen.aliyuncs.com/application/vnd.ms-excel/%E5%85%83%E7%B4%A0%E9%85%8D%E7%BD%AE.xlsx' // a元素图片地址
      a.download = '配置表.xlsx' // 图片名
      a.click()
    }
  }
}
</script>
