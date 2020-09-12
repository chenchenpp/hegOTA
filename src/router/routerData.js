const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: './pages/dashboard/dashboard',
    auth: true
  },{
    path: '/permission/role',
    name: 'role',
    component: './pages/permission/role/list.js',
    auth: true,
  },{
    path: '/permission/role/create',
    name: 'roleCreate',
    component: './pages/permission/role/create.js'
  },{
    path: '/404',
    name: '404',
    component: './pages/404/noFound',
    auth: false
  }
]
export default routes
