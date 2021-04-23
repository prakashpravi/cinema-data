import { Spin, List, Avatar, Typography, Empty, Button } from 'antd'
import * as React from 'react'
import './styled.css'
import { withApollo } from 'react-apollo'
import { allMoviesTitles, myMoviesTitles } from '../../hooks/query'
import moment from 'moment'
const { Title } = Typography
class Mymovie extends React.Component {
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
          : myMoviesTitles(localStorage.getItem('user_id'))
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
          <div className='mymovie_main'>
            <Title level={5} className='m_title'>
              Your Movies
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
                    <Button type='primary' danger>
                      Proceed to extend validity
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
export default withApollo(Mymovie)
