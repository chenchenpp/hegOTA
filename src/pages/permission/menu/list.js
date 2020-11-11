import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {changeMenuListAsync} from '@/store/actions'
import { Table, notification, Button, Card, message, Tree  } from 'antd';
import { EditOutlined, PlusOutlined, RestOutlined, QuestionCircleOutlined  } from '@ant-design/icons';
import './list.scss'
class list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTree: []
    }
  }
  componentDidMount(){ 
    const {changeMenuList} = this.props;
    changeMenuList().then(()=>{
      let menuTreeList= [...this.props.state.MenuData]
      let menuData=[];
      let temp = {};
      for(let i in menuTreeList){
        let curItem={...menuTreeList[i]}
        curItem.title=curItem.menuName;
        curItem.key= `${curItem.parentId}-${curItem.id}`
        temp[curItem.id] = curItem;
      }
      for(let i in temp){
        let parentNode=temp[temp[i].parentId];
        // 当前节点有父级
        if(parentNode&&temp[i].parentId) {
          if(!parentNode.children) {
            parentNode.children = [];
          }
          parentNode.subMenus.push(temp[i]);
          parentNode.children.push(temp[i]);
        } else {
          // 无父级
          temp[i].parentId===0 && menuData.push(temp[i]);
        }
      }
      this.setState({
        menuTree: menuData
      })
    });
  }
  goCreate = () => {
    const {history} = this.props;
    history.push('/permission/menu/main')
  }
  render() {
    return (
      <div className='menu-main'>
        <Card style={{marginBottom: '10px'}}>
          <Button type="primary" shape="round" size='Small' icon={<PlusOutlined />} onClick={this.goCreate}>
            Create
          </Button>
        </Card>
        <Tree treeData={this.state.menuTree} blockNode="true" titleRender={(nodeData) => (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <span>{nodeData.menuName}</span>
              <div style={{flex:'1', textAlign: 'right'}}>
                { nodeData.parentId===0 ? <PlusOutlined className="opare-add"></PlusOutlined> : null}
                <span className="opare-edit" style={{color: '#017959'}}><EditOutlined></EditOutlined> 修改</span>
              </div>
            </div>
          )} 
        />
      </div>
    );
  }
}
// 获取redux仓库数据
const mapStateToProps = state => ({
  state
})
// 处理事件
const mapDispatchToProps = (dispatch) => {
  return {
    changeMenuList: () => dispatch(changeMenuListAsync())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(list);