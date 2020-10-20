import React, { Component } from 'react';
import { axios } from "@/utils/axios";
import { Table, notification, Button, Card } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
const { Column } = Table;
export default class RoleList extends Component{
  constructor(props){
    super(props);
    this.state={
      list: [],
      params: {
        pageIndex: 1,
        pageSize: 10,
        sortType: 'DESC'
      }
    }
  }

  getList=()=>{
    return new Promise((resolve, reject)=>{
      axios.get('/ota-api/permission/role', {
        params: this.state.params
      }).then(res=>{
        console.log(res)
        if(res.code===200){
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(err=>{
        console.log(err)
      })
    })
  }
  getDepartment=()=>{
    return new Promise((resolve, reject)=>{
      axios.get('/ota-api/permission/department').then(res=>{
        if(res.code===200){
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(err=>{
        console.log(err)
      })
    })
  }
  goCreateHandle = ()=>{
    this.props.history.push('/permission/role/main')
  }
  goEditHandle = (record) => {
    this.props.history.push({
      pathname: '/permission/role/main/'+record.id,
    })
  }
  componentDidMount(){ 
    Promise.all([this.getList(), this.getDepartment()]).then((res)=>{
      let roleListData=res[0].content;
      let departmentList=res[1];
      roleListData.forEach(item=>{
        let departmentItem=departmentList.find(data=>data.id==item.departmentId);
        item.departmentName=departmentItem.departmentName;
        item.key=item.id
      })
      this.setState({
        list: roleListData
      })
    },(reject)=>{
      notification.error({
        message: reject.message,
        description: reject.message,
      });
    })
  }
  
  render() {
    return (
      <div>
        <Card style={{marginBottom: '10px'}}>
          <Button type="primary" size='Small' icon={<PlusOutlined />} onClick={this.goCreateHandle}>
            Create
          </Button>
        </Card>
        <Table dataSource={this.state.list}>
          <Column title="Id" dataIndex="id" key="id" sorter={(a, b) => a.id - b.id} />
          <Column title="Department name" dataIndex="departmentName" key="departmentName" />
          <Column title="Role name" dataIndex="roleName" key="roleName" sorter={(a, b) => a.roleName.length - b.roleName.length} />
          <Column title="Role detail" dataIndex="roleDetail" key="roleDetail" 
                  sorter={(a, b) => a.roleDetail.length - b.roleDetail.length} />
          <Column title="Status" dataIndex="status" key="status" render={(text, record)=>{
            return text?'开':'关'
          }} />
          <Column title="Action" render={(text, record)=>{
            return (
              <Button type="primary" size='Small' icon={<EditOutlined />} onClick={this.goEditHandle.bind(this,record)}> EDIT </Button>
            )
          }} />
        </Table>
      </div>
    );
  }
}