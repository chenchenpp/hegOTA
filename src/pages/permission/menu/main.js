import React from 'react';
import { Form,Tabs, Input, Button, Switch, Select, message } from 'antd';
import { connect } from 'react-redux';
import {changeMenuListAsync} from '@/store/actions'
const {TabPane} = Tabs
function MenuMain(props){
  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
  };
  const saveHandle=()=>{
    props.changeMenuList();
    console.log(props, props.dispatch)
  }
  return (
    <div className="menu-main" style={{ background: '#ffffff',padding: '0 40px', paddingBottom: '40px'}}>
      <Form labelAlign="right">
        <Tabs>
          <TabPane tab="INFO" key="1">
            <Form.Item {...formItemLayout} label="Menu Name" name="menuName"  rules={[{ required: true, message: 'Please input your Menu Name!' }]}>
              <Input></Input> 
            </Form.Item>
            <Form.Item {...formItemLayout} label="Menu Url" name="menuUrl">
              <Input prefix="#"></Input>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Menu Css" name="menuCss"  rules={[{ required: true, message: 'Please input your Menu Css!' }]}>
              <Input></Input>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Comment" name="Comment"  rules={[{ required: true, message: 'Please input your Comment!' }]}>
              <Input></Input>
            </Form.Item>
            <Form.Item {...formItemLayout} label="status" name="status" valuePropName="checked" >
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
          </TabPane>
          <TabPane tab="AUTH" key="2">

          </TabPane>
        </Tabs>
        <Form.Item wrapperCol={{span: 4, offset: 10}}>
          <Button shape="round" type="primary" htmlType="submit" block onClick={saveHandle}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
// 获取redux仓库数据
const mapStateToProps = (state) => ({
  state
})
// 处理事件
const mapDispatchToProps = (dispatch) => {
  return {
    changeMenuList: () => dispatch(changeMenuListAsync())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuMain)