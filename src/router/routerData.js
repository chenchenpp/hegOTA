const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: './pages/dashboard/dashboard',
    auth: true
  },{
    path: '/404',
    name: '404',
    component: './pages/404/noFound',
    auth: false
  }
]
export default routes
