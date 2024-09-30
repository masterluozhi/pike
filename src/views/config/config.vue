<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="等级管理" name="level">
      <configTable :columns="levelColumns" type="level" />
    </el-tab-pane>
    <el-tab-pane label="AF参数配置" name="second">
      <config-form />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import configTable from './config-table.vue'
import configForm from './config-from.vue'
export default {
  components: {
    configTable,
    configForm
  },
  data() {
    return {
      levelColumns: ['name', 'level', 'minExperience', 'maxExperience'],
      activeName: 'level'
    }
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">

</style>
