import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import routes from './router'
import { Login, SignIn, Home, Forget } from '../screen'

class RouterApp extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/forget' component={Forget} />
          <Route path='/signin' component={SignIn} />
          <Route path='/admin' component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/notification' component={Home} />
          <Route path='/passwordchange' component={Home} />
          <Route path='/form' component={Home} />
          <Route path='/mymovie' component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default RouterApp
