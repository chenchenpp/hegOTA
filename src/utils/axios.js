import axios from 'axios';
import { message } from 'antd';
// 响应拦截器
axios.interceptors.response.use(
  res => {
    return res.data
  }, err => {
    console.log(err.response)
    const {status: statusCode, data, statusText} = err.response
    if(statusCode===401){
      message.error('未登录, 请先登入');
      setTimeout(()=>{
        window.location.href='/login'
      }, 1500)
    } else if(statusCode===400){
      message.error(`${statusCode}: ${statusText}`);
    }else {
      message.error(data.message);
    }
    return err
  }
);
export { axios }