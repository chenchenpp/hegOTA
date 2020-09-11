import React,{Component} from 'react'
import { Layout, Menu } from 'antd';
import { UserOutlined} from '@ant-design/icons';
require('./header.scss')
const { Header } = Layout;
export default class HegHeader extends Component {
  render(){
    return (
      <Header className="header">
        <div className="logo">HAPPY EASY GO OTA</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" >
            <UserOutlined /> 
          </Menu.Item>
        </Menu>
      </Header>
    )
  }
}