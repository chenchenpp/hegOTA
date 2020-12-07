import React, {Component, lazy} from "react";
import { withRouter, Link } from 'react-router-dom'; //withRouter高阶组件：提供路由配置history/location/match
import { Layout, Breadcrumb } from 'antd';
import { axios } from "@/utils/axios";
import { basePath } from '@/utils/httpUrl.config.js'
import {getCookie} from '../utils/cookieUtil'
import { message } from 'antd';
const HegHeader = lazy(()=>import('@/components/header/header'))
const HegMenu = lazy(()=>import('@/components/menu/menu'))
require('./app.scss')
const { Content, Sider } = Layout;
class HegLayout extends Component {
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
    axios.get(basePath.initPath,{
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
    // 获取菜单数据
    this.getMenuDataHandle();
  }
  // 在此鈎子内使用setstate必须要包裹一层判断否则会报错
  componentDidUpdate(prevProps){
    //面包屑匹配
    const {history, location, routeConfig} = this.props;
    if(prevProps.location.pathname!==location.pathname || this.state.breadcrumbArr.length===0){
      let pathNameArr=location.pathname.split('/')
      let breadcrumbList=pathNameArr.slice(1).map((item, index)=>{
        if(index===0){
          return {
            name: 'dashBoard',
            url: '/dashboard'
          }
        } 
        return {
          name: item,
          url: pathNameArr.slice(0, index+2).join('/')
        }
      });
      this.setState({breadcrumbArr: breadcrumbList}) //面包屑导航数据更新
    }
    // 拦截是否登入
    const token= getCookie('ota.session.id')
    if(!token){
      message.error('未登录, 请先登入');
      history.push('/login')
      return false
    }
    // 判断是否有页面
    // if(!routeConfig.some(item=> item.path===location.pathname)){
    //   window.location.replace('/404')
    //   return
    // }
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
                  return <Breadcrumb.Item key={index}>
                          <Link to={item.url}> {item.name}</Link>
                        </Breadcrumb.Item>
                })}
              </Breadcrumb>
              <Content style={{flex: 'unset', background: '#fff'}}>
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
export default withRouter(HegLayout)