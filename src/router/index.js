import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './router'
import { Login, SignIn, Home, Forget } from '../screen'

class RouterApp extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path={routes.Login} component={Login} />
          <Route path={routes.forget} component={Forget} />
          <Route path={routes.HomeCom} component={Home} />
          <Route path={routes.siginIn} component={SignIn} />
        </Switch>
      </Router>
    )
  }
}

export default RouterApp
