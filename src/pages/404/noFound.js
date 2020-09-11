import React, {Component} from 'react'
import { Button } from 'antd';
import { MehOutlined} from '@ant-design/icons';

require('./noFound.scss')
export default class ErrorPage extends Component{
  componentDidMount(){
    console.log(this.props)
  }
  // 返回按钮
  goBackHandle=()=>{
    const {history} = this.props
    history.goBack()
  }
  render(){
    return (
      <div className="notFound-main">
        <div className="content">
          <MehOutlined style={{fontSize: 180}}/>
          <p className="title">Not Found</p>
          <p className="des">Either you typed a wrong URL, or you followed a bad link.</p>
          <Button type="primary" shape="round" size="large" onClick={this.goBackHandle}>GO BACK</Button>
        </div>
      </div>
    )
  }
}