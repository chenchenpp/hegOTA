import React, {Component} from "react";
require('./dashboard.scss')
export default class Dashboard extends Component {
  render(){
    return (
      <div className="dashboard-main">
        <div className="content">
          <h1 className="title">Happy Easy Go OTA</h1>
          <p>Welcome</p>
        </div>
      </div>
    )
  }
}