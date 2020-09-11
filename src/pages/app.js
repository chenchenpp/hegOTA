import React, {Component, lazy} from "react";
import { Layout, Breadcrumb } from 'antd';
import { axios } from "@/utils/axios";
import {getCookie} from '../utils/cookieUtil'
import { message } from 'antd';
const HegHeader = lazy(()=>import('@/components/header/header'))
const HegMenu = lazy(()=>import('@/components/menu/menu'))
require('./app.scss')
const { Content, Sider } = Layout;
export default class HegLayout extends Component {
  constructor(props){
    super(props);
    this.state={
      menuList: [], //菜单数据
      breadcrumbArr: [] //面包屑导航
    }
  }
  // 获取菜单数据
  getMenuDataHandle=()=>{
    let token=localStorage.getItem('token')
    axios.get('/ota-api/init',{
      headers: { Authorization: token }
    }).then(res=>{
      if(res.code===200){
       res.data.menus.unshift({
        id: 0,
        isOld: false,
        menuCss: "",
        menuKey: "menu_key",
        menuName: "Dashboard",
        menuUrl: "/dashboard",
        parentId: 0,
        permissionVoList: null,
        sort: 1,
        status: true
       })
       this.setState({menuList: res.data.menus})
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  componentDidMount(){
    const {location} = this.props;
    let breadcrumbList=location.pathname.split('/').slice(1);
    this.setState({breadcrumbArr: breadcrumbList}) //面包屑导航数据更新
    // 获取菜单数据
    this.getMenuDataHandle();
  }
  componentDidUpdate(){
    // 路由拦截处理
    const {history, location, routeConfig} = this.props;
    const token= getCookie('ota.session.id')
    if(!token){
      message.error('未登录, 请先登入');
      history.push('/login')
      return false
    }
    // 判断是否有页面
    if(!routeConfig.some(item=> item.path===location.pathname)){
      window.location.replace('/404')
      return
    }
  }
  render(){
    return (
      <div className="app-main">
        <Layout>
          {/* 头部 */}
          <HegHeader></HegHeader>
          <Layout className="content">
            {/* 菜单 */}
            <Sider width={250}>
              <HegMenu menuList={this.state.menuList} history={ this.props.history}></HegMenu>
            </Sider>
            {/* 主体 */}
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                {this.state.breadcrumbArr.map((item, index)=>{
                  return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                })}
              </Breadcrumb>
              <Content style={{minHeight: 280}}>
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}