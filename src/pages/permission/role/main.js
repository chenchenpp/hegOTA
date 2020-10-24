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
export default class RoleList extends Component{
  constructor(props){
    super(props);
    this.state={
      roleName: '',
      roleDetail: '',
      status: false,
      departmentId: 1,
      departmentList: [],
      menuVos: []
    };
    this.pageType= this.props.match.params&&this.props.match.params.id?'EDIT':'CREATE';
    this.id=this.props.match.params&&this.props.match.params.id
  }
  formRef = React.createRef();
  async componentDidMount(){
    try{
      const getDepartment= await getDepartmentList();
      this.setState({
        departmentList: getDepartment
      })
    }catch(err){
      console.log(err)
    }
    if(this.pageType==='EDIT'){
      try {   
        const getRoleInfoData = await getRoleInfo(this.id)
        const { roleName, roleDetail, status, departmentId, menuVos } = getRoleInfoData
        // 表单赋值
        this.formRef.current.setFieldsValue({ roleName, roleDetail, status, departmentId });
        this.setState({menuVos})
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
  // 提交表单
  onFinish= values =>{
    const {history}=this.props;
    let requestType={
      CREATE: 'post',
      EDIT: 'put'
    }
    let menuVos=this.state.menuVos.map(item=>{
      return {id: item.id}
    })
    const requestData = {...values, menuVos}
    if(this.id){
      requestData.id=this.id
      // requestData.operatorId= 0
    }
    const PATH = this.id ? `${rolePath.createRolePath}/${this.id}` : rolePath.createRolePath
    axios[requestType[this.pageType]](PATH, requestData).then(res=>{
      console.log(res)
      if(res.code===200){
        let messageContext = this.pageType === 'CREATE' ? '创建角色成功！' : '修改成功'
        message.success(messageContext)
        history.go(-1);
      }
    })
  }
 
  render() {
    const { roleName, roleDetail, status, departmentId, menuVos } = this.state;
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
              <MenuTree getCheckedTreeHandle={this.getCheckedTreeHandle} menuVos={menuVos}></MenuTree>
            </TabPane>
          </Tabs>
          <Form.Item wrapperCol={{span: 4, offset: 10}}>
            <Button shape="round" type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      
    );
  }
}