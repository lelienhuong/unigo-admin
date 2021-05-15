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
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/users',
    component: Layout,
    redirect: '/users-index',
    name: 'users-management',
    meta: { title: 'User management', icon: 'el-icon-user-solid' },
    children: [
      {
        path: '/users-index',
        name: 'users-index',
        component: () => import('@/views/users/index'),
        meta: { title: 'Users list', icon: 'table' }
      },
      {
        path: '/users-edit/:id',
        name: 'users-edit',
        component: () => import('@/views/users/edit'),
        meta: { title: 'Update a user', icon: 'el-icon-edit-outline' },
        hidden: true
      }
    ]
  },

  {
    path: '/providers',
    component: Layout,
    redirect: '/providers-index',
    name: 'providers-management',
    meta: { title: 'Providers management', icon: 'el-icon-s-custom' },
    children: [
      {
        path: '/providers-index',
        name: 'providers-index',
        component: () => import('@/views/providers/index'),
        meta: { title: 'Providers list', icon: 'table' }
      },
      {
        path: '/providers-create',
        name: 'providers-create',
        component: () => import('@/views/providers/create'),
        meta: { title: 'Create new provider', icon: 'el-icon-plus' }
      },
      {
        path: '/providers-edit/:id',
        name: 'providers-edit',
        component: () => import('@/views/providers/edit'),
        meta: { title: 'Update a provider', icon: 'el-icon-edit-outline' },
        hidden: true
      }
    ]
  },

  {
    path: '/credentials',
    component: Layout,
    redirect: '/credentials-index',
    name: 'credentials-management',
    meta: { title: 'Credentials management', icon: 'el-icon-folder' },
    children: [
      {
        path: '/credentials-index',
        name: 'credentials-index',
        component: () => import('@/views/credentials/index'),
        meta: { title: 'Credentials list', icon: 'table' }
      },
      {
        path: '/credentials-create',
        name: 'credentials-create',
        component: () => import('@/views/credentials/create'),
        meta: { title: 'Create new credential', icon: 'el-icon-plus' }
      },
      {
        path: '/credentials-edit/:id',
        name: 'credentials-edit',
        component: () => import('@/views/credentials/edit'),
        meta: { title: 'Update a credential', icon: 'el-icon-edit-outline' },
        hidden: true
      }
    ]
  },

  {
    path: '/categories',
    component: Layout,
    redirect: '/categories-index',
    name: 'categories-management',
    meta: { title: 'Categories management', icon: 'el-icon-files' },
    children: [
      {
        path: '/categories-index',
        name: 'categories-index',
        component: () => import('@/views/categories/index'),
        meta: { title: 'Categories list', icon: 'el-icon-folder-opened' }
      },
      {
        path: '/categories-create',
        name: 'categories-create',
        component: () => import('@/views/categories/create'),
        meta: { title: 'Create new category', icon: 'el-icon-folder-add' }
      },
      {
        path: '/categories-edit/:slug',
        name: 'categories-edit',
        component: () => import('@/views/categories/edit'),
        meta: { title: 'Update a category', icon: 'el-icon-folder-opened' },
        hidden: true
      }
    ]
  },

  {
    path: '/reviews',
    component: Layout,
    redirect: '/reviews-index',
    name: 'reviews-management',
    meta: { title: 'Reviews management', icon: 'el-icon-magic-stick' },
    children: [
      {
        path: '/reviews-index',
        name: 'reviews-index',
        component: () => import('@/views/reviews/index'),
        meta: { title: 'Reviews list', icon: 'el-icon-magic-stick' }
      }
    ]
  },

  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    name: 'not-found',
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
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
