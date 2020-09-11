import React, {Component, lazy, Suspense} from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from "./router/routerData"
import HegLoading from "./components/loading/loading"
const loginComponent = lazy (() => import('./pages/login/login')); 
let HegLayout = lazy(() => import("./pages/app"));
export default class HegRoute extends Component{
  // routerMapHandle(){
  //   routes.map((item, index) => {
  //     const DynamicComponent= lazy(() => import(`${item.component}`))
  //     return <Route path={item.path} key={index} component={DynamicComponent}></Route>
  //   })
  // }
  render(){
    return (
      <Router>
        <Suspense fallback={<HegLoading></HegLoading>}>
          <Switch>
            <Route exact path="/login" component={loginComponent}></Route>
            <Route path="/" render={({history,location,match}) => {
              return (
                <HegLayout history={history} location={location} match={location} routeConfig={routes}>
                  { 
                    routes.map((item, index) => {
                      const DynamicComponent= lazy(() => import(`${item.component}`));
                      return <Route path={item.path} key={index} component={DynamicComponent}></Route>
                    })
                  }
                </HegLayout>
              )}
            } /> 

          </Switch>
        </Suspense>
      </Router>
    )
  }
}