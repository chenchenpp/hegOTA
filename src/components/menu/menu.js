import React, {Component} from 'react'
import { Menu } from 'antd';
import { UserOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;
export default class HegMenu extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedKeys: ["0-0"],
      openKeys: []
    }
  }
  // 选择菜单项
  goPageHandle=(data) => {
    // 更新菜单展开选中状态
    this.setState({
      selectedKeys: data.key,
      openKeys: [data.keyPath[data.keyPath.length-1]]
    })
    // 跳转
    const {isold, link}=data.item.props
    if(JSON.parse(isold)){
      window.location.href="https://ota.happyeasygo.com/"+link
    }else{
      this.props.history.push(link)
    }
  }
  // 打开子集菜单
  openMenuChange = (keys) =>{
    this.setState({
      openKeys: keys
    })
  }
  // 匹配菜单项
  findMenuKeys= (menuList, openList) => {
    let menuListLength=menuList.length
    for (let i = 0; i<menuListLength; i++) {
      if(menuList[i].menuUrl===this.props.history.location.pathname){
        this.setState({
          selectedKeys: [`${menuList[i].parentId}-${menuList[i].id}`],
          openKeys: openList || []
        })
        return;
      }
      if(menuList[i].subMenus && menuList[i].subMenus.length){
        let openArr=[`${menuList[i].parentId}-${menuList[i].id}`]
        this.findMenuKeys.call(this, menuList[i].subMenus, openArr)
      }
    }
  }
  // 监听菜单变化
  componentDidUpdate(preProps, perState){
    if(preProps.menuList.length!==this.props.menuList.length){
      this.findMenuKeys(this.props.menuList)
    }
  }
  render(){
    return (
      <Menu
          mode="inline"
          selectedKeys={this.state.selectedKeys}
          openKeys={this.state.openKeys}
          style={{ height: '100%', borderRight: 0 }}
          onClick={this.goPageHandle}
          onOpenChange={this.openMenuChange}
        >
          {this.props.menuList.map(item => {
            if(item.subMenus&&item.subMenus.length){
              return (
                <SubMenu key={`${item.parentId}-${item.id}`} icon={<UserOutlined />} title={item.menuName}>
                  {item.subMenus.map(data => {
                    return (
                      <Menu.Item key={`${data.parentId}-${data.id}`} link={data.menuUrl} isold={data.isOld.toString()}>{data.menuName}</Menu.Item>
                    )
                  }
                  )}
                </SubMenu>
              )
            }else{
              return (
                <Menu.Item key={`${item.parentId}-${item.id}`} icon={<UserOutlined />} link={item.menuUrl} isold={item.isOld.toString()}>
                  {item.menuName}
                </Menu.Item>
              )
            }
          })}
        </Menu>
    )
  }
}