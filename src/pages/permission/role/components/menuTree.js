import React, { Component } from 'react';
import { axios } from "@/utils/axios";
import { Tree, Input } from 'antd';
const { Search } = Input;
class MenuTree extends Component {
  constructor(props){
    super(props);
    this.state={
      menuTree: [],
      expandedKeys: [],
      autoExpandParent: false,
      searchValue: ''
    }
  }
  componentDidMount(){
    // 获取菜单数据与渲染
    axios.get('/ota-api/permission/menu').then(res=>{
      if(res.code===200){
        let menuTreeList= [...res.data]
        let menuData=[];
        let temp = {};
        for(let i in menuTreeList){
          let curItem=menuTreeList[i]
          curItem.key=curItem.id;
          curItem.title=curItem.menuName
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
          menuTree: menuData,
          autoExpandParent: true
        })
      }
      
    })
  }
  // 获取筛选目录的id
  getParentId = (id, tree) => {
    let parentId;
    for (let i = 0; i < tree.length; i++) {
      const node =  tree[i];
      if (node.children) {
        if (node.children.some(item => item.parentId === id)) {
          parentId = id;
        } else if (this.getParentId(id, node.children)) {
          parentId = this.getParentId(id, node.children);
        }
      }
    }
    return parentId;
  };
  // 搜索目录
  searchMenuHandle= e =>{
    const { value } = e.target;
    if(!value){
      this.setState({
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: false,
      });
      return
    }
    const expandedKeys = this.state.menuTree.map(item => {
      if (item.title.indexOf(value) > -1) {
        return this.getParentId(item.id, this.state.menuTree);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }
  // 展开指定菜单目录
  onExpand = (expandedKeys=[]) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
 
  render() {
    const {expandedKeys, autoExpandParent, menuTree, searchValue}=this.state
   
     // 匹配菜单选项
    const matchWordHandle= tree => {
      return tree.map(item=>{
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{color: 'red'}}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          ); 
        if (item.children) {
          return {...item, ...{ title, key: item.key, children: matchWordHandle(item.children) }};
        }
        return {...item, ...{ title, key: item.key }} 
      })
    }
    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search"  onChange={this.searchMenuHandle}/>
        <Tree
          checkable
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={matchWordHandle(menuTree)}
          onCheck={this.props.getCheckedTreeHandle}
        />
      </div>
    );
  }
}

export default MenuTree;