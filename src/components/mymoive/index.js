import {
  Spin,
  List,
  Avatar,
  Typography,
  Empty,
  Button,
  message,
  notification
} from 'antd'
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
  readFileContents = async file => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader()
      fileReader.onload = e => {
        resolve(fileReader.result.split(/[\r\n]+/g))
      }
      fileReader.onerror = reject
      fileReader.readAsText(file)
    })
  }
  readAllFiles = async AllFiles => {
    const results = await Promise.all(
      AllFiles.map(async file => {
        const fileContents = await this.readFileContents(file)
        return fileContents
      })
    )
    console.log(results)
    return this.setState({ data: AllFiles })
    // return this.props.onDropsss(AllFiles, results)
  }

  handleUpload = async e => {
    let AllFiles = []
    ;[...e.target.files].map(file => AllFiles.push(file))

    await this.readAllFiles(AllFiles)
  }

  saveData = async () => {
    const state = this.state
    if (!state.data?.length > 0) {
      message.error('Please upload the movie file', 5)
      return
    }
    var aa = []
    const d = this.state.data?.map(v => {
      aa.push({
        lastModified: v.lastModified,
        lastModifiedDate: v.lastModifiedDate,
        name: v.name,
        size: v.size,
        type: v.size,
        webkitRelativePath: v.size
      })
      return v
    })
    console.log(d)
    await message.loading('uploading....', 5)
    fetch('http://193.164.132.55:3001/api/bulk_upload_user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: aa
      })
    })
      .then(data => {
        return data.json()
      })
      .then(response => {
        if (response.error !== true) {
          notification.success({
            message: 'Success',
            description: 'Your file uplaod has been successful!'
          })
          window.location.reload()
        } else {
          message.error('Faild to uplaod', 5)
        }
      })
      .catch(error => {
        message.error('Faild to uplaod', 5)
        console.log(error, 5)
      })
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
                      accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
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
