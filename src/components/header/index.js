import React from 'react'
import {
  PageHeader,
  Upload,
  Breadcrumb,
  Dropdown,
  Menu,
  Drawer,
  Input,
  Button,
  Form,
  message,
  notification,
  Badge
} from 'antd'
// import { DownOutlined } from '@ant-design/icons'
import './styled.css'
import moment from 'moment'
import { withApollo } from 'react-apollo'
import {
  userProfileById,
  updateUserProfileById,
  allMoviesTitles,
  myMoviesTitles
} from '../../hooks/query'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      firstName: null,
      lastName: null,
      email: null,
      mobile_no: null,
      birthday: null,
      fileList: [],
      movieImage: null,
      id: null,
      listdata: []
    }
  }
  componentDidMount = async () => {
    this.props.client
      .query({
        query: userProfileById(localStorage.getItem('user_id'))
      })
      .then(response => {
        if (response?.data) {
          const data = response?.data?.userProfileById
          this.setState({
            firstName: data?.firstName,
            lastName: data?.lastName,
            mobile_no: data?.mobileNo,
            birthday: moment(data?.birthday).format('YYYY-MM-DD'),
            email: data?.email,
            fileList: [
              {
                uid: '-1',
                status: 'done',
                url: data?.profileImg
              }
            ],
            id: data?.id,
            movieImage: data?.profileImg
          })
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
    this.props.client
      .query({
        query: localStorage.getItem('admin')
          ? allMoviesTitles
          : myMoviesTitles(localStorage.getItem('user_id'))
      })
      .then(response => {
        if (response?.data) {
          this.setState({
            listdata: response?.data?.allMovieTitles?.nodes
          })
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  }
  logout = () => {
    localStorage.clear()
    this.props.history.push('/login')
  }
  handleopen = () => {
    const state = this.state
    this.setState({
      open: !state.open
    })
  }
  handlechange = (n, v) => {
    const state = this.state
    this.setState({
      ...state,
      [n]: v
    })
  }
  getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    return reader.readAsDataURL(img)
  }
  handleChange = e => {
    if (!e.file.originFileObj) {
      return
    }

    this.getBase64(e.file.originFileObj, imageUrl => {
      this.setState({
        fileList: [
          {
            uid: '-1',
            name: e.file.name,
            status: 'done',
            url: imageUrl
          }
        ],
        movieImage: imageUrl
      })
    })
  }

  handleSubmit = async () => {
    const {
      firstName,
      lastName,
      email,
      mobile_no,
      birthday,
      movieImage,
      id
    } = this.state
    if (!movieImage) {
      message.error('Please upload the movie image', 5)
      return false
    }

    await message.loading('Loading....', 5)
    this.props.client
      .mutate({
        variables: {},
        mutation: updateUserProfileById(
          firstName,
          lastName,
          email,
          mobile_no,
          moment(birthday).format('YYYY-MM-DD'),
          movieImage,
          id
        )
      })
      .then(res => {
        notification.success({
          message: 'Success',
          description: 'Your profile has been updated!'
        })
        console.log('res:', res)
      })
      .catch(err => {
        message.error(err, 5)
      })
  }
  render () {
    const {
      open,
      firstName,
      lastName,
      email,
      mobile_no,
      birthday,
      fileList,
      listdata
    } = this.state
    const location = window.location.pathname
    return (
      <div className='headermain'>
        <Drawer
          title='Profile Details'
          placement='right'
          onClose={() => this.handleopen()}
          visible={open}
          width={310}
        >
          <div style={{ textAlign: 'center' }}>
            <Upload
              onChange={e => this.handleChange(e)}
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              fileList={fileList}
              multiple={false}
              listType='picture-card'
              onRemove={() =>
                this.setState({
                  fileList: [],
                  movieImage: null
                })
              }
            >
              Image Upload
            </Upload>
            <Form name='normal_login' onFinish={() => this.handleSubmit()}>
              <br />
              <Input
                autoFocus
                autoComplete='off'
                className='Input'
                value={firstName}
                size='large'
                onChange={e => this.handlechange('firstName', e.target.value)}
                placeholder='FirstName'
                required
              />
              <br />
              <br />

              <Input
                autoFocus
                autoComplete='off'
                className='Input'
                value={lastName}
                size='large'
                required
                onChange={e => this.handlechange('lastName', e.target.value)}
                placeholder='LastName'
              />
              <br />
              <br />

              <Input
                autoFocus
                autoComplete='off'
                className='Input'
                value={email}
                size='large'
                onChange={e => this.handlechange('email', e.target.value)}
                placeholder='email'
                required
              />
              <br />
              <br />

              <Input
                autoFocus
                autoComplete='off'
                className='Input'
                value={mobile_no}
                size='large'
                onChange={e => this.handlechange('mobile_no', e.target.value)}
                placeholder='mobile_no'
                required
              />
              <br />
              <br />
              <Input
                autoFocus
                autoComplete='off'
                className='Input'
                value={moment(birthday).format('YYYY-MM-DD')}
                size='large'
                onChange={e => this.handlechange('birthday', e.target.value)}
                placeholder='birthday'
                required
              />
              <br />
              <br />
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                Update
              </Button>
            </Form>
          </div>
        </Drawer>
        <PageHeader
          ghost={false}
          title={
            <Breadcrumb separator={false} className='Breadcrumb'>
              <Breadcrumb.Item className='home'>
                <img
                  className='imgss'
                  alt='img'
                  style={{
                    position: 'absolute',
                    marginTop: -8
                  }}
                  src='assets/TITLES (2).png'
                  onClick={() => (window.location.href = '/home')}
                />
              </Breadcrumb.Item>

              <div className='center_of'>
                <Breadcrumb.Item
                  className={`home ${location === '/home' && 'active'}`}
                  onClick={
                    () => (window.location.href = '/home')
                    //  this.props.history.push('/home')
                  }
                >
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className={`home mb sv ${location === '/mymovie' &&
                    'active'}`}
                  onClick={
                    () => (window.location.href = '/mymovie')
                    // this.props.history.push('/mymovie')
                  }
                >
                  {localStorage.getItem('admin') ? "Data's" : ' My movies'}
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className={`home mb lg ${location === '/notification' &&
                    'active'}`}
                  onClick={
                    () => (window.location.href = '/notification')
                    // this.props.history.push('/notification')
                  }
                >
                  <Badge
                    size='small'
                    count={listdata?.length === 0 ? '0,' : listdata?.length}
                    style={{ backgroundColor: '#52c41a', color: '#fff' }}
                  >
                    Notification
                  </Badge>
                </Breadcrumb.Item>

                {/* {localStorage.getItem('admin') && ( */}
                <Breadcrumb.Item
                  className={`home mb sv ${location === '/request' &&
                    'active'}`}
                  onClick={() => (window.location.href = '/request')}
                >
                  {'Request'}
                </Breadcrumb.Item>
                {/* )} */}
              </div>
            </Breadcrumb>
          }
          extra={[
            <Dropdown
              arrow
              placement='bottomCenter'
              overlay={
                <Menu className='menulist_item'>
                  <Menu.Item
                    className='menulist_item'
                    onClick={() => this.handleopen()}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    className='menulist_item'
                    onClick={() => this.logout()}
                  >
                    Logout
                  </Menu.Item>

                  <Menu.Item
                    className='menulist_item hinmbl'
                    onClick={() => (window.location.href = '/notification')}
                  >
                    {localStorage.getItem('admin') ? "Data's" : ' My movies'}
                  </Menu.Item>
                  <Menu.Item
                    className='menulist_item hinmbl'
                    onClick={() => (window.location.href = '/mymovie')}
                  >
                    Notification
                  </Menu.Item>
                  {localStorage.getItem('admin') && (
                    <Menu.Item
                      className='menulist_item hinmbl'
                      onClick={() => (window.location.href = '/request')}
                    >
                      Request
                    </Menu.Item>
                  )}
                </Menu>
              }
            >
              <span
                style={{
                  cursor: 'pointer'
                }}
              >
                More
                {/* <DownOutlined
                  style={{
                    fontSize: '15px',
                    margin: '4px 0px 0px 2px',
                    position: 'absolute'
                  }}
                /> */}
              </span>
              {/* <Avatar
                className='avatar_icon'
                src='https://i.pinimg.com/564x/95/79/c1/9579c179f04e0f7c52cb3932ec916910.jpg'
              /> */}
            </Dropdown>
          ]}
        />
      </div>
    )
  }
}

export default withApollo(Header)
