import { Spin, List, Avatar, Typography, Empty, Button } from 'antd'
import * as React from 'react'
import './styled.css'
import { withApollo } from 'react-apollo'
import { requestAll, requestAccpect } from '../../hooks/query'
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
                    avatar={<Avatar src={v?.movieImage} />}
                    title={
                      v?.name +
                      ' ' +
                      moment(v?.birthday).format('YYYY-MM-DD') +
                      ' to ' +
                      moment(v?.birthday).format('YYYY-MM-DD')
                    }
                    description={v?.description}
                  />
                  <div className='dis'>
                    <Button type='primary' onClick={() => this.accpectAll(v)}>
                      Accpect
                    </Button>
                    &nbsp;
                    <Button type='primary' danger>
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
