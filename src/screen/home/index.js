import { Row, Col } from 'antd'
import * as React from 'react'
import routes from '../../router/router'
import Header from '../../components/header/index'
import HomeCom from '../../components/home'
import Admin from '../../components/admin'
import Form from '../../components/form/index'
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  Content = () => {
    if (window.location.pathname === routes.form) {
      return <Form {...this.props} />
    } else if (window.location.pathname === routes.admin) {
      return <Admin {...this.props} />
    } else if (window.location.pathname === routes.HomeCom || '/') {
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
