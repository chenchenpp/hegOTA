export const activityRoute = [{
  path: '/activity/orderSharingActivity',
  name: 'orderSharingActivity',
  component: './pages/activity/orderSharingActivity/list',
  auth: false
}, {
  path: '/activity/orderSharingActivity/:type',
  name: 'orderSharingDetail',
  component: './pages/activity/orderSharingActivity/detail',
  auth: false
}]