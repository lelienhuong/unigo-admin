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
      }]
  },
  {
    path: '/qrcodes',
    component: Layout,
    redirect: '/qrcodes-index',
    name: 'qrcodes-management',
    meta: { title: 'qrcodes management', icon: 'el-icon-user-solid' },
    children: [
      {
        path: '/qrcodes-index',
        name: 'qrcodes-index',
        component: () => import('@/views/qrcodes/index'),
        meta: { title: 'QRcodes list', icon: 'table' }
      }
    ]
  },

  {
    path: '/sectors',
    component: Layout,
    redirect: '/sectors-index',
    name: 'sectors-management',
    meta: { title: 'Sectors management', icon: 'el-icon-folder-checked' },
    children: [
      {
        path: '/sectors-index',
        name: 'sectors-index',
        component: () => import('@/views/sectors/index'),
        meta: { title: 'Sectors list', icon: 'table' }
      },
      {
        path: '/sectors-edit/:id',
        name: 'sectors-edit',
        component: () => import('@/views/sectors/edit'),
        meta: { title: 'Update a sector', icon: 'el-icon-edit-outline' },
        hidden: true
      },
      {
        path: '/sectors-create',
        name: 'sectors-create',
        component: () => import('@/views/sectors/create'),
        meta: { title: 'Create new sector', icon: 'el-icon-plus' }
      }
    ]
  },

  {
    path: '/places',
    component: Layout,
    redirect: '/places-index',
    name: 'places-management',
    meta: { title: 'Places management', icon: 'el-icon-folder-checked' },
    children: [
      {
        path: '/places-index',
        name: 'places-index',
        component: () => import('@/views/places/index'),
        meta: { title: 'Places list', icon: 'table' }
      },
      {
        path: '/places-create',
        name: 'places-create',
        component: () => import('@/views/places/create'),
        meta: { title: 'Create new place', icon: 'el-icon-plus' }
      },
      {
        path: '/places-edit/:id',
        name: 'places-edit',
        component: () => import('@/views/places/edit'),
        meta: { title: 'Update a place', icon: 'el-icon-edit-outline' },
        hidden: true
      }
    ]
  },

  {
    path: '/categories',
    component: Layout,
    redirect: '/categories-index',
    name: 'categories-management',
    meta: { title: 'Categories management', icon: 'el-icon-folder-checked' },
    children: [
      {
        path: '/categories-index',
        name: 'categories-index',
        component: () => import('@/views/categories/index'),
        meta: { title: 'Categories list', icon: 'table' }
      },
      {
        path: '/categories-create',
        name: 'categories-create',
        component: () => import('@/views/categories/create'),
        meta: { title: 'Create new category', icon: 'el-icon-plus' }
      },
      {
        path: '/categories-edit/:id',
        name: 'categories-edit',
        component: () => import('@/views/categories/edit'),
        meta: { title: 'Update a category', icon: 'el-icon-edit-outline' },
        hidden: true
      }
    ]
  },

  {
    path: '/stairs',
    component: Layout,
    redirect: '/stairs-index',
    name: 'stairs-management',
    meta: { title: 'Stairs management', icon: 'el-icon-folder-checked' },
    children: [
      {
        path: '/stairs-index',
        name: 'stairs-index',
        component: () => import('@/views/stairs/index'),
        meta: { title: 'Stairs list', icon: 'table' }
      },
      {
        path: '/stairs-create',
        name: 'stairs-create',
        component: () => import('@/views/stairs/create'),
        meta: { title: 'Create new stair', icon: 'el-icon-plus' }
      },
      {
        path: '/stairs-edit/:id',
        name: 'stairs-edit',
        component: () => import('@/views/stairs/edit'),
        meta: { title: 'Update a stair', icon: 'el-icon-edit-outline' },
        hidden: true
      }
    ]
  },

  {
    path: '/nodes',
    component: Layout,
    redirect: '/nodes-index',
    name: 'nodes-management',
    meta: { title: 'Nodes management', icon: 'el-icon-folder-checked' },
    children: [
      {
        path: '/nodes-index',
        name: 'nodes-index',
        component: () => import('@/views/nodes/index'),
        meta: { title: 'Nodes list', icon: 'table' }
      },
      {
        path: '/nodes-create',
        name: 'nodes-create',
        component: () => import('@/views/nodes/create'),
        meta: { title: 'Create new node', icon: 'el-icon-plus' }
      },
      {
        path: '/nodes-edit/:id',
        name: 'nodes-edit',
        component: () => import('@/views/nodes/edit'),
        meta: { title: 'Update a node', icon: 'el-icon-edit-outline' },
        hidden: true
      }
    ]
  },
  {
    path: '/schools',
    component: Layout,
    redirect: '/nodes-index',
    name: 'schools-management',
    meta: { title: 'Schools management', icon: 'el-icon-folder-checked' },
    children: [
      {
        path: '/schools-index',
        name: 'schools-index',
        component: () => import('@/views/schools/index'),
        meta: { title: 'Schools list', icon: 'table' }
      },
      {
        path: '/schools-create',
        name: 'schools-create',
        component: () => import('@/views/schools/create'),
        meta: { title: 'Create new school', icon: 'el-icon-plus' }
      },
      {
        path: '/schools-edit/:id',
        name: 'schools-edit',
        component: () => import('@/views/schools/edit'),
        meta: { title: 'Update a school', icon: 'el-icon-edit-outline' },
        hidden: true
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
