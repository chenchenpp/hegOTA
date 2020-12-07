import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { axios } from "@/utils/axios";
import { otherPath } from '@/utils/httpUrl.config.js'

export default function CreateRegistered(props){
  const { history } = props;
  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
  };
  const saveHandle=function(data){
    axios.post(otherPath.farRegistered, data).then(res=>{
      if(res.code===200){
        message.success('添加成功')
        history.go(-1)
      }else {
        console.log(res)
      }
    }).catch(err=>{
      console.log(err)
    })

  }
  return (
    <div className="fare-register-main ota-container">
      <h1 style={{padding: '20px 0', textAlign: 'center', fontSize: '20px'}}>Create Fare</h1>
      <Form wrapperCol= {{ span: 8 }} onFinish={saveHandle}>
        <Form.Item
          {...formItemLayout}
          name="cellphone"
          label="Cell phone"
          rules={[{ 
            required: true, 
            message: 'Please input your Cell phone!',
          },{
            pattern: /^(91){1}\s{1}\d*$/,
            message: 'Please enter a valid mobile number starting with 91',
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="email"
          label="E-mail"
          rules={[
            { required: true, message: 'Please input your E-mail!' },
            { pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,6}$/,
              message: 'Please enter a valid E-mail'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="newPassword" label="New Password" {...formItemLayout} rules={[{ required: true, message: 'Please input your New Password!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="platform" label="Platform" valuePropName="value" {...formItemLayout} rules={[{ required: true, message: 'Please input your platform!' }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{span: 4, offset: 10}}>
          <Button shape="round" type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}