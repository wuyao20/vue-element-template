import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/department',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Department',
        component: () => import('@/views/department/index'),
        meta: { title: '部门管理', icon: 'department' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: { roles: ['用户管理'] },
    children: [
      {
        path: 'index',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Role',
        component: () => import('@/views/role/index'),
        meta: { title: '角色管理', icon: 'role' }
      }
    ]
  },
  {
    path: '/upload',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Upload',
        component: () => import('@/views/upload/Upload'),
        meta: { title: '上传文件', icon: 'upload' }
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Task',
        component: () => import('@/views/task/index'),
        meta: { title: '定时任务', icon: 'task' }
      }
    ]
  },
  {
    path: '/public',
    component: Layout,
    redirect: '/public/index',
    meta: { title: '公众报表', icon: 'table', roles: ['公众报表'] },
    children: [
      {
        path: 'index',
        name: 'CurrentMonthDev',
        component: () => import('@/views/public/CurrentMonthDev'),
        meta: { title: '当月整体发展', icon: 'charts' }
      },
      {
        path: 'commerce',
        name: 'Commerce',
        meta: { title: '电商报表', icon: 'charts' },
        component: () => import('@/views/commerce/index'),
        children: [
          {
            path: 'conversion',
            name: 'Conversion',
            component: () => import('@/views/commerce/Conversion'),
            meta: { title: '当月转化率', icon: 'charts' }
          },
          {
            path: 'test',
            name: 'Test',
            component: () => import('@/views/commerce/test'),
            meta: { title: 'test', icon: 'charts' }
          }
        ]
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
