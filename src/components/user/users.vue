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
          <el-input placeholder="请输入内容" v-model="Queeryuser.query" clearable @clear="GetUserList">
            <el-button slot="append" icon="el-icon-search" @click="GetUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="UserdialogFormVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 卡片视图列表区域 -->
      <el-table :data="userlist" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="reUserStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editUserEvent(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="clearUserData(scope.row.id)"
            ></el-button>
            <el-tooltip
              class="item"
              :id="scope.row.id"
              effect="dark"
              content="权限管理"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-star-off" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页视图列表区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Queeryuser.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="Queeryuser.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 添加用户-提示信息区域 -->
      <el-dialog title="添加用户" :visible.sync="UserdialogFormVisible" @close="clearFormData">
        <el-form :model="addUser" :rules="addUserRules" ref="addUserForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUser.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="addUser.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUser.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addUser.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="UserdialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUserData">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改用户-提示信息区域 -->
      <el-dialog title="添加用户" :visible.sync="editDialogVisible" @close="editClose">
        <el-form :model="editUser" :rules="editRules" ref="editRef">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editUser.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editUser.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editUser.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      Queeryuser: {
        query: '',
        // 当前选中的页数
        pagenum: 1,
        // 每页显示的行数
        pagesize: 2
      },
      userlist: [],
      total: 0,
      UserdialogFormVisible: false,
      editDialogVisible: false,
      addUser: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUser: {},
      addUserRules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱名称', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editRules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱名称', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
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
      this.userlist = res.data.users
      this.total = res.data.total
    },
    // 每页的条数改变触发
    handleSizeChange(repagesize) {
      this.Queeryuser.pagesize = repagesize
      this.GetUserList()
    },
    // 改变页数后改变
    handleCurrentChange(repagenum) {
      this.Queeryuser.pagenum = repagenum
      this.GetUserList()
    },
    // 修改后台用户状态
    async reUserStatus(data) {
      const { data: userdata } = await this.$http.put(
        `users/${data.id}/state/${data.mg_state}`
      )
      if (userdata.meta.status !== 200) {
        return this.$message.error('修改用户状态失败！')
      }
      this.$message.success(userdata.meta.msg)
    },
    // 清除添加用户表单数据
    clearFormData() {
      this.$refs.addUserForm.resetFields()
    },
    // 添加用户
    addUserData() {
      this.$refs.addUserForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addUser)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        this.UserdialogFormVisible = false
        this.GetUserList()
      })
    },
    // 编辑表单事件
    async editUserEvent(id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        this.$message.error('获取用户信息失败！')
      }
      this.editUser = res.data
      this.editDialogVisible = true
    },
    // 清除修改表单数据
    editClose() {
      this.$refs.editRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          'users/' + this.editUser.id,
          {
            email: this.editUser.email,
            mobile: this.editUser.mobile
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.GetUserList()
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
    // 根据Id删除对应的用户信息
    async clearUserData(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const { data: res } = await this.$http.delete('users/' + id)

      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
      }

      this.$message.success('删除用户成功！')
      this.GetUserList()
    }
  }
}
</script>

<style>
</style>
