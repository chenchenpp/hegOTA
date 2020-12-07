import React, {useEffect, useState} from 'react'
import { Drawer, Button, Form, Select, Input, message } from 'antd';
import styles from './index.module.scss'
import {axios} from '@/utils/axios'
import {memberUserPath} from '@/utils/httpUrl.config'
const {Option}=Select
export const EditCtr=function(props){
  const [form] = Form.useForm();
  const {editVisible, onClose, itemData} = props;
  const wrapperCol={span: 16}
  const [showMonth, setShowMonth] = useState(false)
  useEffect(()=>{
    if(itemData.userId){
      axios.get(memberUserPath.memberUser+'/'+ itemData.userId).then(res=>{
        console.log(res)
        if(res.code===200){
          form.setFieldsValue(res.data)
        } else {
          console.log('初始化错误')
        }
      })
    }
  }, [itemData.userId])
  const saveSubmitHandle= async ()=>{
    try {
      const values=await form.validateFields();
      axios.put(memberUserPath.memberUser+'/'+ itemData.userId, values).then(res=>{
        if(res.code===200){
          onClose(false);
          form.resetFields();
          message.success('保存成功')
        }
      })
    } catch(err){
      console.log(err)
    }
  }
  const getTypeHandle= (val) => {
    if(val===1){
      setShowMonth(true)
    } else {
      setShowMonth(false)
    }
  }
  const closeDrawer=function(){
    onClose(false);
    form.resetFields();
  }
  return (
    <Drawer title={'Edit User '+ itemData.userId} width={720} 
            visible={editVisible} 
            onClose={closeDrawer}
            destroyOnClose={true}
            footer = {
              <div style={{textAlign: 'right'}}>
                <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={saveSubmitHandle} type="primary">
                  Submit
                </Button>
              </div>
            }>
      <Form wrapperCol={wrapperCol} layout="vertical" form={form}>
        <Form.Item label="User name" name="userName">
          <Input disabled={true}></Input>
        </Form.Item>    
        <Form.Item label="Cell phone" name="cellPhone">
          <Input disabled={true}></Input>
        </Form.Item>
        <Form.Item label="Member Point" name="integerNum">
          <Input disabled={true}></Input>
        </Form.Item>
        <Form.Item label="Level of membership" name="memberId" 
                   rules={[{ required: true, message: 'Please input your Level!' }]}>
          <Select>
            <Option value={1001}>Beginner</Option>
            <Option value={1002}>Basic</Option>
            <Option value={1003}>Elite</Option>
            <Option value={1004}>Royal</Option>
            <Option value={1005}>Platinum</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={24}>
          <Form.Item label="Type" name="type" className={styles['three_field']}>
            <Select onChange={getTypeHandle}>
              <Option value={1}>积分充值</Option>
              <Option value={2}>积分扣除</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Points num" name="pointsNum" className={styles['three_field']}>
            <Input type="number"></Input>
          </Form.Item>
          {showMonth ?  <Form.Item label="Points valid month" name="pointsValidMonth" className={styles['three_field']}>
            <Input type="number"></Input>
          </Form.Item> : null}
        </Form.Item>
      </Form>
    </Drawer>
  )
}