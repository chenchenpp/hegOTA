import React, {Component} from 'react'
import { Menu } from 'antd';
import { UserOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;
export default class HegMenu extends Component {
  // 菜单跳转
  goPageHandle=(data) => {
    const {isold, link}=data.item.props
    if(JSON.parse(isold)){
      window.location.href="https://ota.happyeasygo.com/"+link
    }else{
      this.props.history.push(link)
    }
  }
  render(){
    return (
      <Menu
          mode="inline"
          defaultSelectedKeys={['0']}
          style={{ height: '100%', borderRight: 0 }}
          onClick={this.goPageHandle}
        >
          {this.props.menuList.map(item => {
            if(item.subMenus&&item.subMenus.length){
              return (
                <SubMenu key={item.id} icon={<UserOutlined />} title={item.menuName}>
                  {item.subMenus.map(data => {
                    return (
                      <Menu.Item key={`${item.id}${data.id}`} link={data.menuUrl} isold={data.isOld.toString()}>{data.menuName}</Menu.Item>
                    )
                  }
                  )}
                </SubMenu>
              )
            }else{
              return (
                <Menu.Item key={item.id} icon={<UserOutlined />} link={item.menuUrl} isold={item.isOld.toString()}>
                  {item.menuName}
                </Menu.Item>
              )
            }
          })}
        </Menu>
    )
  }
}