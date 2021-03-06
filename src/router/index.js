import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import users from '../components/user/users.vue'
import rights from '../components/power/rights.vue'
import roles from '../components/power/roles.vue'
import cate from '../components/goods/cate.vue'
import params from '../components/goods/params.vue'
import goodslist from '../components/goods/list.vue'
import goodsAdd from '../components/goods/add.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  component: Login
},
{
  path: '/home',
  component: Home,
  redirect: '/welcome',
  children: [
    { path: '/welcome', component: welcome },
    { path: '/users', component: users },
    { path: '/rights', component: rights },
    { path: '/roles', component: roles },
    { path: '/categories', component: cate },
    { path: '/params', component: params },
    { path: '/goods', component: goodslist },
    { path: '/goods/add', component: goodsAdd }
  ]
}
]

const router = new VueRouter({
  routes
})

// eslint-disable-next-line no-undef
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenval = window.sessionStorage.getItem('token')
  if (!tokenval) return next('/login')
  next()
})

export default router
