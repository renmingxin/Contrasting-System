import Main from '@/components/main'
import parentView from '@/components/parent-view'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
        path: '/',
        name: 'login',
        meta: {
            title: 'Login - 登录',
            hideInMenu: true
        },
        component: () => import('@/view/login/login.vue')
    },
    {
        path: '/defaultPage',
        name: 'defaultPage',
        meta: {
            title: '默认页',
            hideInMenu: true
        },
        component: () => import('@/view/defaultPage/defaultPage.vue')
    },
    {
        path: '/home',
        name: '_home',
        redirect: '/login',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [{
            path: '/home',
            name: 'home',
            meta: {
                hideInMenu: true,
                title: '首页',
                notCache: true,
                icon: 'md-home'
            },
            component: () => import('@/view/single-page/home')
        }]
    },
    {
        path: '/dataComparison', // 必须项
        name: 'dataComparison', // 必须项，后面缓存页面需要用到，且这个name是唯一的
        meta: {
            icon: 'md-cloud-upload',
            title: '自定义对比',
            showAlways: true
        },
        component: Main, // 一级目录必须使用Main组件作为component
        children: [
            {
                path: '/parallel',
                name: 'parallel',
                meta: {
                    icon: 'ios-document',
                    title: '横向对比'
                },
                component: () => import('@/view/dataComparison/parallel.vue')
            },
            {
                path: '/vertical',
                name: 'vertical',
                meta: {
                    icon: 'ios-document',
                    title: '纵向对比'
                },
                component: () => import('@/view/dataComparison/vertical.vue')
            },
        ]
    },
    {
        path: '/systemSettings', // 必须项
        name: 'systemSettings', // 必须项，后面缓存页面需要用到，且这个name是唯一的
        meta: {
            icon: 'md-settings',
            title: '系统配置',
            showAlways: true
        },
        component: Main, // 一级目录必须使用Main组件作为component
        children: [
            {
                path: '/gameSettings',
                name: 'gameSettings',
                meta: {
                    icon: 'ios-phone-landscape',
                    title: '游戏服务器配置'
                },
                component: () => import('@/view/system-settings/gameSettings.vue')
            },
            {
                path: '/channelSettings',
                name: 'channelSettings',
                meta: {
                    icon: 'ios-phone-landscape',
                    title: '渠道配置'
                },
                component: () => import('@/view/system-settings/channelSettings.vue')
            },
            {
                path: '/gameCategoryDeploy',
                name: 'gameCategoryDeploy',
                meta: {
                    icon: 'ios-phone-landscape',
                    title: '游戏类别配置'
                },
                component: () => import('@/view/system-settings/gameCategoryDeploy.vue')
            },

        ]
    },
]
