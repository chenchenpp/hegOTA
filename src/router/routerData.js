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
    path: '/permission/role/main/:id?',
    name: 'roleMain',
    component: './pages/permission/role/main.js',
    auth: true,
  }, {
    path: '/permission/menu'
  },{
    path: '/404',
    name: 'noFound',
    component: './pages/404/noFound',
    auth: false
  }
]
export default routes
