import NotFound from '@/views/404.vue'
import Home from '@/views/Home.vue'
import Main from '@/views/Main.vue'
import Form from '@/views/nav1/Form.vue'
import user from '@/views/nav1/user.vue'
import Page6 from '@/views/nav3/Page6.vue'

let router = [
  {
    path: '/',
    component: Home,
    name: '导航一',
    iconCls: 'el-icon-message', // 图标样式class
    children: [
      { path: '/main', component: Main, name: '主页', hidden: true },
      { path: '/form', component: Form, name: 'Form' },
      { path: '/user', component: user, name: '列表' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-setting',
    leaf: true, // 只有一个节点
    children: [
        { path: '/page6', component: Page6, name: '导航三' }
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
]
export default router
