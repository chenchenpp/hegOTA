import {permissionRouteData} from './permission.js'
import {memberUserData} from './memberUser.js'
import {activityRoute} from './activity'
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
  },{
    path: '/sendMarketingSms',
    name: 'sendMarketingSms',
    component: './pages/sendMarketingSms/list',
    auth: false
  },{
    path: '/sendMarketingSms/create',
    name: 'sendSmsCreate',
    component: './pages/sendMarketingSms/create',
    auth: false
  },{
    path: '/flight/cache',
    name: 'flightCache',
    component: './pages/flightCache/list',
    auth: false
  },{
    path: '/vipOrder/vipOrderManagement',
    name: 'vipOrderList',
    component: './pages/vipOrder/list',
    auth: false
  },
  ...permissionRouteData,
  ...memberUserData,
  ...activityRoute
]
export default routes
