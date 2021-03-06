import React from 'react'
import './styled.css'
import { Card, Row, Col, Typography } from 'antd'
import ModalCom from '../comman/dialogbox'
const { Meta } = Card
const { Title } = Typography
class LinelistCom extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      show_data: null
    }
  }
  handleModal = list => {
    const state = this.state
    this.setState({
      ...state,
      open: !state.open,
      show_data: list
    })
  }
  render () {
    const { open, show_data } = this.state
    const { listdata } = this.props
    return (
      <div className='linelist_main'>
        <ModalCom
          open={open}
          onCancel={() => this.handleModal()}
          okText={false}
        >
          <Row gutter={16}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <img style={{ width: '100%' }} alt='img' src={show_data?.img} />
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Title level={5} className='modal_title'>
                <label>Name :</label>
                {show_data?.name}
              </Title>
              <Title level={5} className='modal_title'>
                <label>Registered name :</label>
                {show_data?.registered_name}
              </Title>
              <Title level={5} className='modal_title'>
                <label>Registered date :</label> {show_data?.registered_date}
              </Title>
            </Col>
            <Title level={5} className='modal_title_dis'>
              <label>Short description of movie :</label> {show_data?.dis}
            </Title>
          </Row>
        </ModalCom>
        <Row gutter={16}>
          {listdata?.map(list => {
            return (
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
                <Card
                  onClick={() => this.handleModal(list)}
                  hoverable
                  cover={<img alt='example' src={list.img} />}
                >
                  <Meta title={list.name} />
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
}

export default LinelistCom
