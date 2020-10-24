import React, { Component } from 'react';
import { axios } from "@/utils/axios";
import { Table, notification, Button, Card, Pagination, message, Popconfirm  } from 'antd';
import { EditOutlined, PlusOutlined, RestOutlined, QuestionCircleOutlined  } from '@ant-design/icons';
import { rolePath } from '@/utils/httpUrl.config.js'
const { Column } = Table;
export default class RoleList extends Component{
  constructor(props){
    super(props);
    this.state={
      list: [],
      departmentList: [],
      params: {
        pageIndex: 1,
        pageSize: 10,
        sortType: 'DESC'
      },
      totalPage: 0,
    }
  }

  getList=()=>{
    return new Promise((resolve, reject)=>{
      axios.get(rolePath.createRolePath, {
        params: this.state.params
      }).then(res=>{
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
      axios.get(rolePath.department).then(res=>{
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
  componentDidMount(){ 
    Promise.all([this.getList(), this.getDepartment()]).then((res)=>{
      let roleListData=res[0].content;
      let departmentList=res[1];
      roleListData.forEach(item=>{
        let departmentItem=departmentList.find(data=>data.id===item.departmentId);
        item.departmentName=departmentItem.departmentName;
        item.key=item.id
      })
      this.setState({
        departmentList,
        list: roleListData,
        totalPage: res[0].numberOfElements
      });
    },(reject)=>{
      notification.error({
        message: reject.message,
        description: reject.message,
      });
    })
  }
  // 翻页
  changePageHandle= (pageIndex) => {
    let params={...this.state.params, pageIndex}
    // 改变分页参数后请求分页
    this.setState({ params }, ()=>{
      this.getList().then(res=>{
        let roleListData=res.content;
        roleListData.forEach(item=>{
          let departmentItem=this.state.departmentList.find(data=>data.id===item.departmentId);
          item.departmentName=departmentItem.departmentName;
          item.key=item.id
        })
        this.setState({
          list: roleListData,
          totalPage: res.numberOfElements
        });
      })
    });
  };
  // 创建
  goCreateHandle = ()=>{
    this.props.history.push('/permission/role/main')
  }
  //跳转修改页
  goEditHandle = (record) => {
    this.props.history.push({
      pathname: '/permission/role/main/'+record.id,
    })
  }
  // 删除
  deleteRoleHandle = (record) => {
    axios.delete(`${rolePath.createRolePath}/${record.id}`).then(res=>{
      console.log(res)
      if(res.code===200){
        message.success('删除成功!')
        this.changePageHandle(this.state.params.pageIndex)
      }
    })
  }
  render() {
    return (
      <div>
        <Card style={{marginBottom: '10px'}}>
          <Button type="primary" shape="round" size='Small' icon={<PlusOutlined />} onClick={this.goCreateHandle}>
            Create
          </Button>
        </Card>
        <Table dataSource={this.state.list} pagination={{ pageSize: this.state.params.pageSize, total: this.state.totalPage }} onChange={(pagination)=> this.changePageHandle(pagination.current)}>
          <Column title="Id" dataIndex="id" key="id" sorter={(a, b) => a.id - b.id} />
          <Column title="Department" dataIndex="departmentName" key="departmentName" />
          <Column title="Role" dataIndex="roleName" key="roleName" sorter={(a, b) => a.roleName.length - b.roleName.length} />
          <Column title="Role detail" dataIndex="roleDetail" key="roleDetail" 
                  sorter={(a, b) => a.roleDetail.length - b.roleDetail.length} />
          <Column title="Status" dataIndex="status" key="status" render={(text, record)=>{
            return text?'开':'关'
          }} />
          <Column title="Action" align="center" render={(text, record)=>{
            return (
              <>
                <EditOutlined style={{color: '#1890ff', fontSize: '20px'}} onClick={this.goEditHandle.bind(this,record)} /> 
                <Popconfirm title="Are you sure delete this role?" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  onConfirm={ this.deleteRoleHandle.bind(this,record) }
                  placement="left">
                  <RestOutlined style={{color: 'red', fontSize: '20px', marginLeft: '10px'}}/>
                </Popconfirm>
              </>
            )
          }} />
        </Table>
      </div>
    );
  }
}