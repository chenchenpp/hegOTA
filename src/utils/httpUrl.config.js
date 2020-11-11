const BASE_URL="/ota-api"
function addBaseUrl(url){
  return BASE_URL+url
}
// 基础接口模块
export let basePath= {
  initPath: addBaseUrl('/init'),
}
// 登录模块
export let loginModule = {
  loginPath: addBaseUrl('/login')
}
// 角色模块
export let rolePath={
  createRolePath: addBaseUrl('/permission/role'),
  department: addBaseUrl('/permission/department'),
}
export let menuAuthPath = {
  menuPath: addBaseUrl('/permission/menu')//菜单-查询
}
export let otherPath={
  farRegistered: addBaseUrl('/fare/registered'),
}