import {
  Spin,
  List,
  Avatar,
  Typography,
  Empty,
  Button,
  notification,
  message
} from 'antd'
import * as React from 'react'
import './styled.css'
import { withApollo } from 'react-apollo'
import {
  requestAll,
  requestAccpect,
  canccelrequestAccpect
} from '../../hooks/query'
import { UserOutlined } from '@ant-design/icons';

import moment from 'moment'
const { Title } = Typography
class Request extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loader: true,
      listdata: []
    }
  }
  componentDidMount = async () => {
    await setTimeout(() => this.setState({ loader: false }), 2000)
    this.props.client
      .query({
        query: requestAll
      })
      .then(response => {
        if (response?.data) {
          const data = response?.data?.allMovieTitles?.nodes
          this.setState({
            listdata: data
          })
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  }
  cancelAll = async val => {
    debugger
    await fetch('http://193.164.132.55:3001/api/sent_message', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('emailId'),
        message: `Sorry the (${val?.englishTitleName}) movie name was decline`
      })
    })
      .then(data => {
        return data.json()
      })
      .then(response => {
        notification.success({
          message: 'Success',
          description: 'This item was decline'
        })
        window.location.reload()
      })
      .catch(error => {
        message.error('Faild to canel rquest', 5)
        console.log(error, 5)
      })
    await this.props.client
      .mutate({
        mutation: canccelrequestAccpect(val.id)
      })
      .then(response => {})
      .catch(err => {
        console.log('err:', err)
      })
  }
  accpectAll = async val => {
    await this.props.client
      .mutate({
        mutation: requestAccpect(val.id)
      })
      .then(response => {
        if (response?.data) {
          const data = response?.data?.allMovieTitles?.nodes
          this.setState({
            listdata: data
          })
          window.location.reload()
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  }
  render () {
    const { loader, listdata } = this.state
    return (
      <div>
        {loader && (
          <div className='loader'>
            <Spin size='large' />
          </div>
        )}
        {!loader && (
          <div className='request_main'>
            <Title level={5} className='m_title'>
              Request's
            </Title>
            {listdata?.length === 0 && <Empty />}
            {listdata?.map(v => {
              return (
                <List.Item className='cards'>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={v?.movieImage}
                        icon={!v?.movieImage && <UserOutlined />}
                      />
                    }
                    title={
                      v?.englishTitleName +
                      ' ' +
                      moment(v?.birthday).format('YYYY-MM-DD')
                      // +
                      // ' to ' +
                      // moment(v?.birthday).format('YYYY-MM-DD')
                    }
                    description={v?.description}
                  />
                  <div className='dis'>
                    <Button type='primary' onClick={() => this.accpectAll(v)}>
                      Accpect
                    </Button>
                    &nbsp;
                    <Button
                      type='primary'
                      danger
                      onClick={() => this.cancelAll(v)}
                    >
                      Cancel
                    </Button>
                  </div>
                </List.Item>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}
export default withApollo(Request)
