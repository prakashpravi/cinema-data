import { Spin, List, Avatar, Typography, Empty, Button, message } from 'antd'
import * as React from 'react'
import './styled.css'
import { withApollo } from 'react-apollo'
import { allMoviesTitles, myMoviesTitles } from '../../hooks/query'
import moment from 'moment'
import { CloudUploadOutlined } from '@ant-design/icons'
const { Title } = Typography
class Mymovie extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loader: true,
      listdata: [],
      data: []
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
  handleUpload = async e => {
    let AllFiles = []
    ;[...e.target.files].map(file => AllFiles.push(file))

    await this.setState({ data: AllFiles })
  }
  saveData = () => {
    const state = this.state
    if (!state.data?.length > 0) {
      message.error('Please upload the movie file', 5)
      return
    }
  }
  render () {
    const { loader, listdata, data } = this.state
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
              {localStorage.getItem('admin') ? "Data's" : 'Your Movies'}
            </Title>

            {localStorage.getItem('admin') && (
              <>
                <div className={'drap'}>
                  <div className={'root'}>
                    <input
                      type='file'
                      multiple
                      onChange={e => this.handleUpload(e)}
                      disabled={this.props.disabled}
                      accept='application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
        text/plain, application/pdf/*'
                    />
                    <CloudUploadOutlined className={'icons'} />
                    <p className={'testupload'}>Drag & Drop your files here</p>
                    <p className={'testupload'}>OR</p>
                    <Button
                      className={'submit'}
                      style={{
                        textTransform: 'capitalize',
                        padding: '8px 22px',
                        fontSize: 13
                      }}
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>
                <br />
                <Button
                  type='primary'
                  className='adddatas'
                  onClick={() => this.saveData()}
                >
                  Submit
                </Button>

                <br />
              </>
            )}

            {data?.length > 0 && (
              <List
                header={<div>Files</div>}
                bordered
                dataSource={data?.map(v => v?.name)}
                renderItem={(item, i) => (
                  <List.Item>
                    <Typography.Text mark>{i}</Typography.Text> {item}
                  </List.Item>
                )}
              />
            )}

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
