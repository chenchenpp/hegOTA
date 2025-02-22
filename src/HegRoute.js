import React, {Component, lazy, Suspense} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import routes from "./router/routerData"
import HegLoading from "./components/loading/loading"
const loginComponent = lazy (() => import('./pages/login/login')); 
let HegLayout = lazy(() => import("./pages/app"));
export default class HegRoute extends Component{
  routerMapHandle= ()=> {
    return routes.map((item, index) => {
      // 注意：lazy目前只支持默认导出并且要和Suspense组件使用
      const DynamicComponent= lazy(() => import(`${item.component}`))
      return <Route exact path={item.path} key={index} component={DynamicComponent}></Route>
    })
  }
  render(){
    return (
      <Router>
        <Suspense fallback={<HegLoading></HegLoading>}>
          <Switch>
            <Route exact path="/login" component={loginComponent}></Route>
            <HegLayout path="/">
              <Switch>
                  { 
                    this.routerMapHandle()
                  }
                  <Redirect to="/404" /> 
              </Switch>
            </HegLayout>
          </Switch>
        </Suspense>
      </Router>
    )
  }
}