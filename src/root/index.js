import * as React from 'react'
import RouterApp from '../router/index'
import AppGQLClient from '../App.gqlclient'
import AppAuth from '../App.auth'

class Root extends React.Component {
  render () {
    return (
      <div className='warpper'>
        <AppAuth>
          <AppGQLClient>
            <RouterApp />
          </AppGQLClient>
        </AppAuth>
      </div>
    )
  }
}

export default Root
