import { Spin, List, Avatar, Typography, Empty } from 'antd'
import * as React from 'react'
import './styled.css'
import { withApollo } from 'react-apollo'
import { allMoviesTitles, myMoviesTitles1 } from '../../hooks/query'
import { CheckCircleOutlined,CloseCircleOutlined } from '@ant-design/icons'
const { Title } = Typography
class Notification extends React.Component {
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
        query: localStorage.getItem('admin')
          ? allMoviesTitles
          : myMoviesTitles1(localStorage.getItem('user_id'))
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
          <div className='notification_main'>
            <Title level={5} className='m_title'>
              Your Notifications
            </Title>
            {listdata?.length === 0 && <Empty />}
            {listdata?.map(v => {
              return (
                <List.Item className='cards'>
                  <List.Item.Meta
                    avatar={<Avatar src={v?.movieImage} />}
                    title={v?.name}
                    description={v?.description}
                  />
                  <div className='dis'>
                   
                    {v?.isPurchase ? <><CloseCircleOutlined />verified</> :<> <CheckCircleOutlined /> cancel</>}
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
export default withApollo(Notification)
