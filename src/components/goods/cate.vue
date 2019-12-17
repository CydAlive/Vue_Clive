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
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 内容区域 -->
      <tree-table
        :data="catelist"
        :columns="columns"
        show-index
        index-text="#"
        :selection-type="false"
        :expand-type="false"
        border
      >
        <template slot="isRight" slot-scope="scope">
          <i
            class="el-icon-success"
            style="color: lightgreen"
            v-if="scope.row.cat_deleted !== 'false'"
          ></i>
          <i class="el-icon-error" style="color: red" v-else></i>
        </template>
        <template slot="isPid" slot-scope="scope">
          <el-button size="mini" v-if="scope.row.cat_pid === 0">一级</el-button>
          <el-button size="mini" v-else-if="scope.row.cat_pid === 1" type="success">二级</el-button>
          <el-button size="mini" v-else type="warning">三级</el-button>
        </template>
        <template slot="isCaozuo">
          <el-button size="mini" class="el-icon-edit" type="primary">编辑</el-button>
          <el-button size="mini" class="el-icon-delete" type="danger">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[30, 20, 10, 5]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      catelist: [],
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          prop: 'cat_deleted',
          type: 'template',
          template: 'isRight'
        },
        {
          label: '排序',
          type: 'template',
          template: 'isPid'
        },
        {
          label: '操作',
          type: 'template',
          template: 'isCaozuo'
        }
      ]
    }
  },
  created() {
    this.getShopList()
  },
  methods: {
    async getShopList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo
      })
      console.log(res.data)
      if (res.meta.status !== 200) {
        return this.$message.info('获取商品列表失败！')
      }
      // 把数据列表，赋值给 catelist
      this.catelist = res.data.result
      // 为总数据条数赋值
      this.total = res.data.total
    },
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize
      this.getShopList()
    },
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage
      this.getShopList()
    }
  }
}
</script>

<style>
</style>
