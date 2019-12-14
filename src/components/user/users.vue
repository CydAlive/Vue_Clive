<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图搜索区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 卡片视图列表区域 -->
    <el-table :data="userlist" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Queeryuser: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      totol: 0
    }
  },
  created() {
    this.GetUserList()
  },
  methods: {
    async GetUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.Queeryuser
      })
      if (res.meta.status !== 200) return this.$massage.error(res.meta.msg)
      console.log(res)
      this.userlist = res.data.users
      this.totol = res.data.totol
    }
  }
}
</script>

<style>
</style>
