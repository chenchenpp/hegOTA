import axios from 'axios';
import { message } from 'antd';
// 响应拦截器
axios.interceptors.response.use(
  res => {
    return res.data
  }, err => {
    message.error('未登录, 请先登入');
    setTimeout(()=>{
      window.location.href='/login'
    }, 1500)
  }
);
export { axios }