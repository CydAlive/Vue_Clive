<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 添加按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="getRolesListData">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 一级权限渲染 -->
            <el-row
              :class="['bottom-border','y-center',i1 === 0 ? 'top-border' : '']"
              :key="item1.id"
              v-for="(item1, i1) in scope.row.children"
            >
              <el-col :span="5">
                <el-tag closable @close="removeThis3(scope.row, item1.id)">{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级权限渲染 -->
              <el-col :span="19">
                <el-row
                  :class="['y-center',i2 === 0 ? '' : 'top-border']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeThis3(scope.row, item2.id)">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeThis3(scope.row, item3.id)"
                    >{{ item3.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" prop>
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getRolesListData: []
    }
  },
  created() {
    this.gitRolesList()
  },
  methods: {
    async gitRolesList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      console.log(res.data)
      this.getRolesListData = res.data
    },
    async removeThis3(role, rightId) {
      const confirmState = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmState !== 'confirm') {
        this.$message.info('取消了删除！')
      }
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      )

      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败！')
      }
      role.children = res.data
    }
  }
}
</script>

<style lang="less" scope>
.el-tag {
  margin: 10px 10px 10px 0;
}
.bottom-border {
  border-bottom: 1px solid #ccc;
}
.top-border {
  border-top: 1px solid #ccc;
}
.y-center {
  display: flex;
  align-items: center;
}
</style>
