import { axios } from "@/utils/axios";
import { message } from 'antd';
import { menuAuthPath } from '@/utils/httpUrl.config.js'
import {CHANGE_MENU_LIST} from './actionType'
// 异步处理
const changeMenuList = (data) => {
  return {
    type: CHANGE_MENU_LIST,
    payload: data
  }
}
export const changeMenuListAsync = () => {
  return async (dispatch, getState) => {
    const [res, err] = await axios.get(menuAuthPath.menuPath).then(res=>{
      if(res.code===200){
        return [res, null]
      } else {
        return [null, err]
      }
    })
    if(err){
      message.error(`${err.code}: ${err.message}`);
    } else {
      dispatch(changeMenuList(res.data))
    }    
  }
}