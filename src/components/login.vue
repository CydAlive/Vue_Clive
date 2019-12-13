<template>
  <div class="login_container">
      <div class="login_box">
          <!-- 头像 -->
          <div class="avatar_box">
              <img src="../assets/logo.png" alt="">
          </div>
          <el-form ref="loginFormRef" :model="loginform" :rules="loginrules" class="login_form">
            <!-- 用户名 -->
            <el-form-item  prop="username">
                <el-input v-model="loginform.username" prefix-icon="iconfont icon-user"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <el-input v-model="loginform.password" type="password" prefix-icon="iconfont icon-3702mima"></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="info" @click="resetlogin">重置</el-button>
                <el-button type="primary" @click="loginup">登陆</el-button>
            </el-form-item>

          </el-form>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登陆表单的数据绑定
      loginform: {
        username: '',
        password: ''
      },
      // 表单验证规则
      loginrules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetlogin () {
      this.$refs.loginFormRef.resetFields()
    },
    loginup () {
      this.$refs.loginFormRef.validate(async valid => {
        const { data: res } = await this.$http.post('login', this.loginform)
        if (res.meta.status !== 200) return this.$message.error('登陆失败！')
        this.$message.success('登陆成功！')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }

  }
}
</script>

<style lang="less" scoped>
.login_container{
    height: 100%;
    background: #2b4b6b;
}
.login_box{
    width: 450px;
    height: 300px;
    border-radius: 5px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .avatar_box{
        position: absolute;
        width: 130px;
        height: 130px;
        border-radius: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border: 1px solid #eee;
        padding: 5px;
        box-sizing: border-box;
        box-shadow: 0 0 10px #ccc;
        background: #fff;
        img{
            width: 100%;
            width: 100%;
            border-radius: 50%;
            background: #eee;
        }
    }
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

}
</style>
