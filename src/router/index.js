import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import users from '../components/user/users.vue'

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
    { path: '/users', component: users }
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
