import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Index'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home'),
        children: [
          {
            path: '/1',
            name: '1',
            component: () => import('../views/dsjs'),
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register')
  },
  {
    path: '/myEcharts',
    name: 'myEcharts',
    component: () => import('../components/MyEcharts')
  },
  {
    path: '/401error',
    namae: '401error',
    component: () => import('../components/error/401')
  },
  {
    /**
     * 这是教师端页面
     */
    path: '/mainT',
    name: 'MainT',
    component: () => import('../views/teacher/MainT'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/teacher/Welcome'),
      },
      {
        path: '/numlist',
        name: 'Contestant',
        component: () => import('../views/teacher/Contestant'),
      },{
        path: '/details',
        name: 'Details',
        // component: () => import('../views/teacher/Details'),
      },{
        path: '/sop',
        name: 'SOP',
        component: () => import('../views/teacher/SOP'),
      },
      {
        path: '/racing',
        name: 'racing',
        component: () => import('../views/teacher/Racing'),
      },{
        path: '/report',
        name: 'report',
        component: () => import('../views/teacher/Report'),
      },{
        path: '/examine',
        name: 'Examine',
        component: () => import('../views/teacher/Examine'),
      },
      {
        path: '/personal',
        name: 'personal',
        component: () => import('../components/Personal')
      },
      {
        path: '/security',
        name: 'security',
        component: () => import('../components/Security'),
      },
    ],
  },
  {
    /**
     * 这是学生端页面
     */
    path: '/mainS',
    name: 'MainS',
    component: () => import('../views/student/MainS'),
    redirect: '/homeS',
    children: [
      {
        path: '/homeS',
        name: 'homeS',
        component: () => import('../views/student/HomeS'),
      },
      {
        path: '/myrace',
        name: 'Myrace',
        component: () => import('../views/student/Myrace'),
      },
      {
        path: '/teamrace',
        name: 'Teamrace',
        component: () => import('../views/student/Teamrace'),
      },
      {
        path: '/hot',
        name: 'hot',
        component: () => import('../views/student/Hot'),
      },
      {
        path: '/detailsS',
        name: 'detailsS',
        component: () => import('../views/student/DetailsS'),
      },
      {
        path: '/myTeam',
        name: 'MyTeam',
        component: () => import('../views/student/MyTeam'),
      },
      {
        path: '/square',
        name: 'Square',
        component: () => import('../views/student/Square'),
      },
      {
        path: '/result',
        name: 'Result',
        component: () => import('../views/student/Result'),
      },
      {
        path: '/notice',
        name: 'Notice',
        component: () => import('../views/student/Notice'),
      },
      {
        path: '/personal',
        name: 'personal',
        component: () => import('../components/Personal')
      },
      // {
      //   path: '/security',
      //   name: 'security',
      //   component: () => import('../components/Security'),
      // },

    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
