<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="gotoAdd">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 商品表格 -->
      <el-table :data="goodsList" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="商品名称" prop="goods_name"></el-table-column>
          <el-table-column label="商品价格（元）" prop="goods_price" width="130px"></el-table-column>
          <el-table-column label="商品重量" prop="goods_weight" width="100px"></el-table-column>
          <el-table-column label="创建时间">
              <template slot-scope="scope">
                  {{scope.row.add_time | filterDate}}
              </template>
          </el-table-column>
          <el-table-column label="操作">
              <template>
                  <el-button size="mini" class="el-icon-edit" type="primary"></el-button>
                  <el-button size="mini" class="el-icon-delete" type="danger"></el-button>
              </template>
          </el-table-column>
      </el-table>

      <!-- 分页视图列表区域 -->
      <el-pagination
        @size-change="listSizeChange"
        @current-change="listCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      goodsList: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.info('获取产品列表失败！')
      }
      this.total = res.data.total
      this.goodsList = res.data.goods
      console.log(res)
    },
    listSizeChange(newsize) {
      this.queryInfo.pagesize = newsize
      this.getGoodsList()
    },
    listCurrentChange(newval) {
      this.queryInfo.pagenum = newval
      this.getGoodsList()
    },
    gotoAdd() {
      this.$router.push('/goods/add')
    }
  }
}
</script>

<style>
</style>
