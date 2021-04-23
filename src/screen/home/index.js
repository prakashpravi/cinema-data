import { Row, Col } from 'antd'
import * as React from 'react'
import routes from '../../router/router'
import Header from '../../components/header/index'
import HomeCom from '../../components/home'
import Admin from '../../components/admin'
import Form from '../../components/form/index'
import Mymovie from '../../components/mymoive/index'
import PasswordChange from '../../screen/password/index'
import Notification from '../../components/notification/index'
import Request from '../../components/request/index'
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  Content = () => {
    if (window.location.pathname === routes.request) {
      return <Request {...this.props} />
    } else if (window.location.pathname === routes.passwordchange) {
      return <PasswordChange {...this.props} />
    } else if (window.location.pathname === routes.notification) {
      return <Notification {...this.props} />
    } else if (window.location.pathname === routes.mymovie) {
      return <Mymovie {...this.props} />
    } else if (window.location.pathname === routes.form) {
      return <Form {...this.props} />
    } else if (window.location.pathname === routes.admin) {
      return <Admin {...this.props} />
    } else if (window.location.pathname === routes.HomeCom) {
      return <HomeCom {...this.props} />
    }
  }
  render () {
    return (
      <Row style={{ width: 'max-content' }}>
        <Col>
          {' '}
          <Header {...this.props} />
          {this.Content()}
        </Col>
      </Row>
    )
  }
}
export default Home
