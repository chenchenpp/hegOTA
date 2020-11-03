import {CHANGE_MENU_LIST} from './actionType'
// 获取菜单
export let MenuData = (state=[], action) => {
  switch(action.type) {
    case CHANGE_MENU_LIST:
      return action.payload
    default:
      return state;
  }
}
