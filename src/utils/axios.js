import axios from 'axios';
import { message } from 'antd';
axios.interceptors.request.use(config => {
  let token=localStorage.getItem("token")
  if(token){
    config.headers.Authorization=token
  }
  return config
})
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
    } else if(statusCode===403){
      message.error('没有权限访问此页面！');
      window.history.go(-1)
    }else {
      message.error(data.message);
    }
    return err
  }
);
export { axios }