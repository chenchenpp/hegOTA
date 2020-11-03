import React, {Component} from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { axios } from "@/utils/axios";
import { loginModule } from '@/utils/httpUrl.config.js'
import { setCookie } from "@/utils/cookieUtil";
import { Form, Input, Button } from 'antd';
require('./login.scss')
export default class Login extends Component {
  onFinish = values => {
    axios.post(loginModule.loginPath,values).then(res=>{
      if(res.code===200){
        const { token, username } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        setCookie('ota.session.id', token)
        this.props.history.push('/dashboard')
      }
    }).catch(err=>{
      console.log(err)
    })
  };

  render(){
    return (
      <div className="login-main">
        <div className="login-content">
          <h1 className="title">Login In</h1>
          <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
            <Form.Item name="username" label={<UserOutlined className="site-form-item-icon" />}  rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input placeholder="Username"></Input>
            </Form.Item>
            <Form.Item name="password" label={<LockOutlined className="site-form-item-icon" />} rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input type="password" placeholder="Password"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}