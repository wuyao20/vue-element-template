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
        meta: { title: '部门管理', icon: 'department', roles: ['department'] }
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
        meta: { title: '用户管理', icon: 'el-icon-user', roles: ['user'] }
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
        meta: { title: '角色管理', icon: 'role', roles: ['roles'] }
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
        meta: { title: '上传文件', icon: 'upload', roles: ['upload'] }
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'quartzTask',
        component: () => import('@/views/task/index'),
        meta: { title: '定时任务', icon: 'task', roles: ['task'] }
      }
    ]
  },
  {
    path: '/public',
    component: Layout,
    redirect: '/public/index',
    meta: { title: '公众报表', icon: 'table', roles: ['charts'] },
    children: [
      {
        path: 'index',
        name: 'CurrentMonthDev',
        component: () => import('@/views/public/CurrentMonthDev'),
        meta: { title: '当月整体发展', icon: 'charts', roles: ['whole'] }
      },
      {
        path: 'noactive',
        name: 'NoActive',
        component: () => import('@/views/public/NoActive'),
        meta: {
          title: '非活明细下载', icon: 'download', roles: ['noactive']
        }
      },
      {
        path: 'commerce',
        name: 'Commerce',
        meta: { title: '电商报表', icon: 'charts', roles: ['commerce'] },
        redirect: 'conversion',
        component: () => import('@/views/commerce/index'),
        children: [
          {
            path: 'conversion',
            name: 'Conversion',
            component: () => import('@/views/commerce/Conversion'),
            meta: { title: '当月转化率', icon: 'charts', roles: ['conversion'] }
          },
          {
            path: 'thatday',
            name: 'thatDay',
            component: () => import('@/views/commerce/thatDay'),
            meta: { title: '当天发展报表量', icon: 'charts', roles: ['todayDev'] }
          },
          {
            path: 'delivery',
            name: 'Delivery',
            component: () => import('@/views/commerce/delivery'),
            meta: { title: '配送人员管理', icon: 'delivery', roles: ['delivery'] }
          }
        ]
      },
      {
        path: 'self',
        name: 'Self',
        redirect: 'target',
        component: () => import('@/views/public/self/index'),
        meta: { title: '自营报表', icon: 'businessHall', roles: ['self'] },
        children: [
          {
            path: 'target',
            name: 'Target',
            component: () => import('@/views/public/self/target'),
            meta: { title: '营业厅管理', icon: 'businessHall', roles: ['selfhall'] }
          },
          {
            path: 'task',
            name: 'Task',
            component: () => import('@/views/public/self/task'),
            meta: { title: '自营指标管理', icon: 'target', roles: ['selftask'] }
          },
          {
            path: 'dev2person',
            name: 'Dev2Person',
            component: () => import('@/views/public/self/wholeDev2Person'),
            meta: { title: '整体发展到人', icon: 'target', roles: ['dev2person'] }
          },
          {
            path: 'dev2Hall',
            name: 'Dev2Hall',
            component: () => import('@/views/public/self/wholeDev2Hall'),
            meta: { title: '整体发展到厅', icon: 'businessHall', roles: ['dev2hall'] }
          }
        ]
      },
      {
        path: 'stock',
        name: 'Stock',
        component: () => import('@/views/public/stock/index'),
        meta: { title: '存量报表', icon: 'table', roles: ['stock'] },
        children: [
          {
            path: 'vip3',
            name: 'VIP3',
            component: () => import('@/views/public/stock/VIP3'),
            meta: { title: 'VIP3', icon: 'table', roles: ['stock'] }
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
