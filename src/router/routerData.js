import {permissionRouteData} from './permission.js'
const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: './pages/dashboard/dashboard',
    auth: true
  },{
    path: '/404',
    name: 'noFound',
    component: './pages/404/noFound',
    auth: false
  },{
    path: '/fareRegistered',
    name: 'fareRegistered',
    component: './pages/fareRegistered/create',
    auth: false
  },
  ...permissionRouteData
]
export default routes
