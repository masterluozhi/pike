import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/config/ConstructionTheme',
    name: 'config',
    meta: {
      title: '配置',
      icon: 'lock'
    },
    children: [
      {
        path: '/config/ConstructionTheme',
        component: () => import('@/views/config/construction-theme.vue'),
        name: 'ConstructionTheme',
        meta: { title: '建造主题配置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/config/ConstructionContent',
        component: () => import('@/views/config/construction-content.vue'),
        name: 'ConstructionContent',
        meta: { title: '建造内容配置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/config/CustomerDemand',
        component: () => import('@/views/config/customer-demand.vue'),
        name: 'CustomerDemand',
        meta: { title: '顾客需求配置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/config/CustomerMilestone',
        component: () => import('@/views/config/customer-milestone.vue'),
        name: 'CustomerMilestone',
        meta: { title: '顾客成就里程碑配置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/config/CustomerProfile',
        component: () => import('@/views/config/customer-profile.vue'),
        name: 'CustomerProfile',
        meta: { title: '顾客档案配置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/config/OrderTheme',
        component: () => import('@/views/config/order-theme.vue'),
        name: 'OrderTheme',
        meta: { title: '订单主题配置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/config/OrderContent',
        component: () => import('@/views/config/order-content.vue'),
        name: 'OrderContent',
        meta: { title: '订单内容配置', icon: 'dashboard', noCache: true }
      },

      {
        path: '/config/item',
        component: () => import('@/views/config/item.vue'),
        name: 'item',
        meta: { title: '元素配置', icon: 'dashboard', noCache: true }
      },
      // {
      //   path: '/config/layout',
      //   component: () => import('@/views/layout/layout.vue'),
      //   name: 'layout',
      //   meta: { title: '布局', icon: 'dashboard', noCache: true  }
      // },
      {
        path: '/config/level',
        component: () => import('@/views/config/level.vue'),
        name: 'level',
        meta: { title: '升级配置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/config/initialLayout',
        component: () => import('@/views/config/initial-layout.vue'),
        name: 'initialLayout',
        meta: { title: '棋盘初始配置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/config/token',
        component: () => import('@/views/config/token.vue'),
        name: 'token',
        meta: { title: '代币配置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/config/commonParameter',
        component: () => import('@/views/config/common-parameter.vue'),
        name: 'commonParameter',
        meta: { title: '公共参数配置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/config/MemberAttribute',
        component: () => import('@/views/config/member-attribute.vue'),
        name: 'MemberAttribute',
        meta: { title: '会员属性配置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/config/qa',
        component: () => import('@/views/config/qa.vue'),
        name: 'qa',
        meta: { title: '问卷配置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/config/qaConfig',
        component: () => import('@/views/config/qaConfig.vue'),
        name: 'qa',
        meta: { title: '问卷数值配置', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/mainTask',
    component: Layout,
    redirect: '/mainTask/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/task/mainTask/maintask'),
        name: 'index',
        meta: { title: '任务', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/courseSchedule',
    component: Layout,
    redirect: '/courseSchedule/index',
    name: 'courseSchedule',
    meta: {
      title: '课程',
      icon: 'lock'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/task/courseSchedule/courseSchedule'),
        name: 'task',
        meta: { title: '课程', icon: 'user', noCache: true }
      },
      {
        path: 'food',
        component: () => import('@/views/task/courseSchedule/food/foodnutrition.vue'),
        name: 'food',
        meta: { title: '食物', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/user/user.vue'),
        name: 'user',
        meta: { title: '用户', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/prop',
    component: Layout,
    redirect: '/prop/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/prop/prop'),
        name: 'propIndex',
        meta: { title: '道具', icon: 'user', noCache: true }
      }
    ]
  },
  // {
  //   path: '/buff',
  //   component: Layout,
  //   redirect: '/buff/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/buff/buff'),
  //       name: 'assignment',
  //       meta: { title: '增益性魔法', icon: 'user', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/achievement',
    component: Layout,
    redirect: '/achievement/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/achievement/achievement'),
        name: 'achievementIndex',
        meta: { title: '成就', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/talent',
    component: Layout,
    redirect: '/talent/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/talent/talent'),
        name: 'talentIndex',
        meta: { title: '达人', icon: 'user', noCache: true }
      }
    ]
  },

  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'rolePermission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },
  //
  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,

  //
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'createArticle', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'articleList', icon: 'list' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'mergeHeader' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'pdf', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },
  //
  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n-demo/index'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

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
