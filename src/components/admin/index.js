import React, { Component } from 'react'
import { Input, Row, Col, Button } from 'antd'
import './styeld.css'
const { TextArea } = Input
class Admin extends Component {
  render () {
    return (
      <div className='main_admin'>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Input
              placeholder='name'
              value={'Black Panther'}
              style={{ width: '100%' }}
              suffix='name'
            />
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Input
              placeholder='name'
              value={'American superhero'}
              style={{ width: '100%' }}
              suffix='Registered Name'
            />
          </Col>
          <br />
          <br />
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Input
              placeholder='name'
              value={'21/01/2021'}
              style={{ width: '100%' }}
              suffix='Registered Date'
            />
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <TextArea
              placeholder='name'
              rows={4}
              value={
                'Black Panther is a 2018 American superhero film based on the Marvel Comics character of the same name. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is the 18th film in the Marvel Cinematic Universe (MCU).'
              }
              style={{ width: '100%' }}
              suffix='Description'
            />
          </Col>
          <Button className='continue_submit_btn'>Submit</Button>
        </Row>
      </div>
    )
  }
}
export default Admin
