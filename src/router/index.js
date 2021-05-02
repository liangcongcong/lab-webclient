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
//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
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
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  }
]

//异步挂载的路由
//动态需要根据权限加载的路由表 
export const asyncRoutes = [
  {
    path: '/userList',
    //component: () => import('@/views/userManage/index'), // Parent router-view
    component: Layout,
    name: 'UserList',
    meta: { title: '用户列表',icon: 'table',roles: ['sysManager'] }, //页面需要的权限
    children:[
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/userManage/student/index'),
        meta: { title: '学生列表', roles: ['sysManager'] }
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/userManage/teacher/index'),
        meta: { title: '教师列表',roles: ['sysManager']  }
      },
      {
        path: 'allUser',
        name: 'AllUser',
        component: () => import('@/views/userManage/allUser/index'),
        meta: { title: '所有用户列表',roles: ['sysManager']  }
      }
    ]
  },
  
  {
    path: '/gruopManage',
    //component: () => import('@/views/userManage/index'), // Parent router-view
    component: Layout,
    name: 'GruopManage',
    meta: { title: '分组管理', icon: 'theme',roles: ['sysManager'] }, //页面需要的权限
    children: [
      {
        path: 'addGroup',
        name: 'AddGroup',
        component: () => import('@/views/userManage/group/addGroup'),
        meta: { title: '增加分组',roles: ['sysManager']}
      },
      {
        path: 'groupList',
        name: 'GroupList',
        component: () => import('@/views/userManage/group/groupList'),
        meta: { title: '分组列表',roles: ['sysManager']}
      }
    ]
  },
  {
    path: '/gruopType',
    //component: () => import('@/views/userManage/index'), // Parent router-view
    component: Layout,
    name: 'GroupType',
    meta: { title: '分组类型管理', icon: 'example',roles: ['sysManager'] }, //页面需要的权限
    children: [
      {
        path: 'addGroupType',
        name: 'AddGroupType',
        component: () => import('@/views/userManage/groupType/addGroupType'),
        meta: { title: '增加分组类型',roles: ['sysManager']}
      },
      {
        path: 'groupListType',
        name: 'GroupListType',
        component: () => import('@/views/userManage/groupType/groupListType'),
        meta: { title: '分组类型列表',roles: ['sysManager']}
      }
    ]
  },
  {
    path: '/accountManage',
    //component: () => import('@/views/userManage/index'), // Parent router-view
    component: Layout,
    name: 'AccountManage',
    meta: { title: '账户管理', icon: 'people',roles: ['sysManager'] }, //页面需要的权限
    children: [
      {
        path: 'allAccount',
        name: 'AllAccount',
        component: () => import('@/views/userManage/account/allAccount'),
        meta: { title: '所有账户',roles: ['sysManager']}
      },
      {
        path: 'dataCount',
        name: 'DataCount',
        component: () => import('@/views/userManage/account/dataCount'),
        meta: { title: '数据统计',roles: ['sysManager']}
      },
      {
        path: 'accountFlow',
        name: 'AccountFlow',
        component: () => import('@/views/userManage/account/accountFlow'),
        meta: { title: '账户流水',roles: ['sysManager']}
      },
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Menu',
    meta: {
      title: '菜单',
      icon: 'nested',
      roles: ['teacher']
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '菜单1', roles: ['teacher'] },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/userManage/student/index'),
            name: 'Menu1-1',
            meta: { title: '菜单1-1', roles: ['teacher'] }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/userManage/student/index'),
            name: 'Menu1-2',
            meta: { title: '菜单1-2', roles: ['teacher'] },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/userManage/student/index'),
                name: 'Menu1-2-1',
                meta: { title: '菜单1-2-1', roles: ['teacher']}
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/userManage/student/index'),
                name: 'Menu1-2-2',
                meta: { title: '菜单1-2-2', roles: ['teacher'] }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/userManage/student/index'),
            name: 'Menu1-3',
            meta: { title: '菜单1-3', roles: ['teacher'] }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/userManage/student/index'),
        name: 'Menu2',
        meta: { title: '菜单2', roles: ['teacher'] }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '其他链接', icon: 'link' , roles: ['student']}
      }
      
    ]
  }
];


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
