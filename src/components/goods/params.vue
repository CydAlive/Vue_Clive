<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 下拉选择框 -->
      <el-alert title="警告提示的文案" type="warning" :closable="false"></el-alert>
      <el-row class="pro-mar">
        <el-col>
          <span>选择商品分类：</span>
        </el-col>
      </el-row>
      <el-cascader
        v-model="getCateListModel"
        :options="getCateListData"
        :props="props"
        @change="handleChange"
        expandTrigger="hover"
      ></el-cascader>
      <!-- tab标签页 -->
      <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
        <el-tab-pane label="用户管理" name="first">
          <el-button type="primary" :disabled="butDisabled">添加参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <el-button type="primary" :disabled="butDisabled">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getCateListData: [],
      getCateListModel: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      activeTabName: 'first'
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }
      console.log(res)
      this.getCateListData = res.data
    },
    handleChange(value) {
      this.getCateListModel = value
    },
    handleTabClick(activeTabName) {
      console.log(activeTabName)
    }
  },
  computed: {
    butDisabled() {
      if (this.getCateListModel.length !== 3) return true
      return false
    }
  }
}
</script>

<style lang="less" scoped>
.pro-mar {
  margin: 15px 0;
}
</style>
