import React, { Component } from 'react';
import { Form,Tabs, Input, Button, Switch, Select, message } from 'antd';
import { axios } from "@/utils/axios";
import { rolePath } from '@/utils/httpUrl.config.js'
import MenuTree from './components/menuTree.js'
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
require('./create.scss')
// 获取部门列表
const getDepartmentList=function() {
  return new Promise((resolve, reject)=>{
    axios.get(rolePath.department).then(res=>{
      if(res.code===200){
        resolve(res.data)
      } else {
        reject(res)
      }
    })
  })
}
const getRoleInfo=function(id){
  return new Promise((resolve, reject)=>{
    axios.get(rolePath.createRolePath+`/${id}`).then(res=>{
      if(res.code===200){
        resolve(res.data)
      } else {
        reject(res)
      }
    })
  })
}
// const [form] = Form.useForm();
export default class RoleList extends Component{
  constructor(props){
    super(props);
    this.state={
      roleName: '',
      roleDetail: '',
      status: 0,
      departmentId: 1,
      departmentList: [],
      menuVos: []
    }
  }
  formRef = React.createRef();
  async componentDidMount(){
    const { location }=this.props;
    try{
      const getDepartment= await getDepartmentList();
      this.setState({
        departmentList: getDepartment
      })
    }catch(err){
      console.log(err)
    }
    if(location.query && location.query.id !== undefined){
      try {   
        const getRoleInfoData = await getRoleInfo(location.query.id)
        const { roleName, roleDetail, status, departmentId } = getRoleInfoData
        this.formRef.current.setFieldsValue({ roleName, roleDetail, status, departmentId });
        // this.setState({roleName, roleDetail,status, departmentId})
      }catch(err){
        console.log(err)
      }
    }
    
  }
   // 获取选中的菜单
  getCheckedTreeHandle= (checkedKeys, e)=>{
    this.setState({
      menuVos: e.checkedNodes
    })
  }
  onFinish= values =>{
    values.status=values.status?1:0;
    const requestData = {...values}
    console.log(requestData)
    axios.post(rolePath.createRolePath, requestData).then(res=>{
      console.log(res)
      if(res.code===200){
        message.success('创建角色成功！')
      }
    })
  }
 
  render() {
    const { roleName, roleDetail, status, departmentId } = this.state;
    return (
      <div className="role-create-main">
        <Form ref={this.formRef} wrapperCol= {{ span: 8 }} onFinish={this.onFinish} initialValues={{roleName, roleDetail, status, departmentId}}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="NAME" key="1">
              <Form.Item
                label="Role Name"
                name="roleName"
                rules={[{ required: true, message: 'Please input your Role Name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Role Detail"
                name="roleDetail"
                rules={[{ required: true, message: 'Please input your Role Detail!' }]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item label="status" name="status" valuePropName="checked" >
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Form.Item>
              <Form.Item label="Department" name="departmentId" valuePropName="value" rules={[{ required: true, message: 'Please input your Department!' }]}>
                <Select allowClear>
                  {this.state.departmentList.map((item, index)=>(
                    <Option value={item.operatorId} key={index}>{item.departmentName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </TabPane>
            <TabPane tab="MENUS" key="2">
              <MenuTree getCheckedTreeHandle={this.getCheckedTreeHandle}></MenuTree>
            </TabPane>
          </Tabs>
          <Form.Item wrapperCol={{span: 4, offset: 10}}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      
    );
  }
}