<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="警告提示的文案" type="warning" :closable="false"></el-alert>
      <el-row class="pro-mar">
          <el-col>
              <span>选择商品分类：</span>
          </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.pro-mar{
    margin: 15px 0;
}
</style>
