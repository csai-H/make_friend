import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    /* 重定向到登录页面 */
    redirect: '/login'
    // component: () => import('../views/Login')
  },
  {
    /* 登录路由 */
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login')
  },
  {
    /* 注册路由 */
    path: '/register',
    name: 'Register',
    component: () => import('../views/login/Register')
  },
  {
    /* 忘记密码路由 */
    path: '/reset',
    name: 'Reset',
    component: () => import('../views/login/Reset')
  },
  {
    /* 主页面框架路由 */
    path: '/sesame',
    name: 'Sesame',
    component: () => import('../views/main/Sesame'),
    redirect: '/homePage',
    children: [
      {
        /* 首页路由 */
        path: '/homePage',
        name: 'HomePage',
        component: () => import('../views/main/HomePage')
      },
      {
        /* 用户管理路由 */
        path: '/sysUser',
        name: 'SysUser',
        component: () => import('../views/main/user/SysUser')
      },
      {
        /* 角色管理路由 */
        path: '/sysRole',
        name: 'SysRole',
        component: () => import('../views/main/role/SysRole')
      },
      {  /* 菜单管理路由 */
        path: '/sysMenu',
        name: 'SysMenu',
        component: () => import('../views/main/menu/SysMenu')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history', // 加入这一句即可
  routes
})

export default router
