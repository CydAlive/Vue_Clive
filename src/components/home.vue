<template>
  <el-container class="homeContainer">
    <!-- 头部区域 -->
    <el-header>
      <div class>
        <h1>个人后台管理系统</h1>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <el-container>
      <!-- 左侧区域 -->
      <el-aside :width="istogglefn ? '64px' : '200px'">
        <!-- 左侧菜单 -->
        <el-menu background-color="#373d41" text-color="#fff" active-text-color="#ffd04b"
        unique-opened :collapse="istogglefn" :collapse-transition="false" router :default-active="isactivechange">
          <div class="togglecoll" @click="togglefn">|||</div>
          <!-- 一级菜单 -->
          <el-submenu :index="item.id" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subitem.path" v-for="subitem in item.children" :key="subitem.id"
            @click="activechenge('/' + subitem.path)">
              <!-- 二级菜单模板区域 -->
              <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{ subitem.authName }}</span>
            </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 是否折叠
      istogglefn: false,
      isactivechange: ''
    }
  },
  created() {
    this.getMenulist()
    this.createdactive()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有菜单
    async getMenulist() {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.status)
      this.menulist = res.data
    },
    togglefn() {
      this.istogglefn = !this.istogglefn
    },
    activechenge(index) {
      window.sessionStorage.setItem('activechenge', index)
      this.isactivechange = window.sessionStorage.getItem('activechenge')
    },
    createdactive() {
      this.isactivechange = window.sessionStorage.getItem('activechenge')
    }
  }
}
</script>

<style lang="less" scoped>
.homeContainer {
  height: 100%;
}
.el-header {
  display: flex;
  background: #373d41;
  justify-content: space-between;
  align-items: center;
  h1 {
    color: #fff;
  }
}
.el-aside {
  background: #373d41;
}
.el-main {
  background: #eee;
}
.el-menu{
  border-right: none;
}
.iconfont{
  margin-right: 10px;
}
.togglecoll{
  height: 30px;
  background: #444;
  font-size: 16px;
  line-height: 30px;
  color: #eee;
  text-align: center;
  letter-spacing: 0.2em;
}
</style>
