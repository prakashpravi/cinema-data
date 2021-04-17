import {
  Button,
  Input,
  message,
  notification,
  Form,
  Avatar,
  Typography,
  Row,
  Col,
  DatePicker,
  // Upload
} from 'antd'
import * as React from 'react'
import moment from 'moment'
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  ArrowRightOutlined,
  RollbackOutlined,
  MobileOutlined
} from '@ant-design/icons'
import './styled.css'
import Stepper from './stepper'
const { Title } = Typography
class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      first_name: null,
      last_name: null,
      password: null,
      mobile_no: null,
      email: null,
      otp: null,
      newpassword: null,
      current: 0,
      birthday: null,
      movieImage: null,
      fileList: []
    }
  }
  next = () => {
    const state = this.state
    this.setState({ current: state.current + 1 })
  }

  setInputValue = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  handleSubmitotp = async () => {
    await message.loading('Loading....', 5)
    this.next()
  }
  handleSubmits = async () => {
    const { password, mobile_no } = this.state
    // if (!movieImage) {
    //   message.error('Please upload the movie image', 5)
    //   return false
    // }
    if (mobile_no?.length !== 10) {
      message.error('Please enter valid mobile number', 5)
      return false
    } else if (password?.length < 8) {
      message.error('Please enter the password min length 8', 5)
      return false
    }
    await message.loading('Loading....', 5)
    fetch('http://3.141.17.227:3001/api/sign_up', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        birthday: moment(this.state.birthday).format('YYYY-MM-DD'),
        mobile_no: this.state.mobile_no,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        profile_img: ''
      })
    })
      .then(data => {
        return data.json()
      })
      .then(response => {
        if (response.info === 'user create successfully') {
          notification.success({
            message: 'Success',
            description: 'Your account created has been successful!'
          })
          // localStorage.setItem('token', response?.token)
          // localStorage.setItem('user_id', response?.data?.id)
          this.props.history.push('/login')
        } else {
          message.error('Faild to Sign In', 5)
        }
      })
      .catch(error => {
        message.error('Faild to Sign In', 5)
      })
  }
  handleSubmitSigin = async () => {
    await message.loading('Loading....', 5)
    notification.success({
      message: 'Success',
      description: 'Your account created has been successful!'
    })
    localStorage.setItem('token', 'token')
    this.props.history.push('/home')
  }
  handleSubmit = async () => {
    // await message.loading('Loading....', 5)
    // this.next()
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
  render () {
    const {
      first_name,
      last_name,
      current,
      email,
      mobile_no,
      otp,
      newpassword,
      password,
      birthday,
      // fileList
    } = this.state
    return (
      <div className='main-login'>
        <Row style={{ height: '100%' }}>
          <Col md={{ span: 24 }} lg={{ span: 12 }} className='f-col'>
            <Stepper
              current={current}
              steps={[
                {
                  content: (
                    <>
                      <div className='main'>
                        <Form
                          name='normal_login'
                          className='login-form'
                          onFinish={() => this.handleSubmit()}
                        >
                          <span
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            <Avatar
                              size={54}
                              src='assets/TITLES (2).png'
                              className='avatar'
                            />
                            <Title level={3} className='title'>
                              Sign Up
                            </Title>
                          </span>
                          {/* <Upload
                            onChange={e => this.handleChange(e)}
                            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                            fileList={fileList}
                            multiple={false}
                            onRemove={() =>
                              this.setState({
                                fileList: [],
                                movieImage: null
                              })
                            }
                          >
                            <span
                              style={{
                                padding: 8,
                                border: '1px solid #d9d9d9'
                              }}
                            >
                              + Upload
                            </span>
                          </Upload> */}
                          {/* <br /> */}
                          <Form.Item
                            name='first_name'
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your first name!'
                              }
                            ]}
                          >
                            <Input
                              autoFocus
                              autoComplete='off'
                              className='Input'
                              prefix={
                                <UserOutlined className='site-form-item-icon' />
                              }
                              value={first_name}
                              onChange={e =>
                                this.setInputValue('first_name', e.target.value)
                              }
                              placeholder='First Name'
                            />
                          </Form.Item>
                          <Form.Item
                            name='last_name'
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your last name!'
                              }
                            ]}
                          >
                            <Input
                              autoComplete='off'
                              className='Input'
                              onChange={e =>
                                this.setInputValue('last_name', e.target.value)
                              }
                              prefix={
                                <UserOutlined className='site-form-item-icon' />
                              }
                              value={last_name}
                              placeholder='Last Name'
                            />
                          </Form.Item>
                          <Form.Item
                            name='email'
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your mail!'
                              }
                            ]}
                          >
                            <Input
                              autoComplete='off'
                              className='Input'
                              prefix={
                                <MailOutlined className='site-form-item-icon' />
                              }
                              onChange={e =>
                                this.setInputValue('email', e.target.value)
                              }
                              value={email}
                              placeholder='Email'
                              type='email'
                            />
                          </Form.Item>
                          <Form.Item
                            name='birthday'
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your date of birth!'
                              }
                            ]}
                          >
                            <DatePicker
                              value={birthday}
                              style={{ width: '100%' }}
                              onChange={e => this.setInputValue('birthday', e)}
                            />
                          </Form.Item>
                          <Form.Item
                            name='mobilenumber'
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your mobilenumber!'
                              }
                            ]}
                          >
                            <Input
                              autoComplete='off'
                              className='Input'
                              prefix={
                                <MobileOutlined className='site-form-item-icon' />
                              }
                              onChange={e =>
                                this.setInputValue('mobile_no', e.target.value)
                              }
                              value={mobile_no}
                              placeholder='Mobile Number'
                              type='number'
                            />
                          </Form.Item>
                          <Form.Item
                            name='password'
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your password!'
                              }
                            ]}
                          >
                            <Input.Password
                              autoComplete='off'
                              className='Input'
                              prefix={
                                <LockOutlined className='site-form-item-icon' />
                              }
                              onChange={e =>
                                this.setInputValue('password', e.target.value)
                              }
                              type='password'
                              value={password}
                              placeholder='Current Password'
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              type='primary'
                              htmlType='submit'
                              className='login-form-button'
                              onClick={() => this.handleSubmits()}
                            >
                              Submit{' '}
                              <ArrowRightOutlined className='loginIcon' />
                            </Button>
                            <span className='login-form-register'>
                              Back to your &nbsp;
                              <span
                                style={{
                                  cursor: 'pointer',
                                  textDecoration: 'underline'
                                }}
                                onClick={() =>
                                  this.props.history.push('/login')
                                }
                              >
                                Sign in <RollbackOutlined />
                              </span>{' '}
                            </span>
                          </Form.Item>
                        </Form>
                      </div>
                    </>
                  )
                },
                {
                  content: (
                    <>
                      <div className='main'>
                        <Form
                          name='normal_login'
                          className='login-form'
                          onFinish={() => this.handleSubmitotp()}
                        >
                          <Avatar
                            size={54}
                            src='https://i.pinimg.com/564x/95/79/c1/9579c179f04e0f7c52cb3932ec916910.jpg'
                            className='avatar'
                          />
                          <Title level={3} className='title'>
                            Enter your OTP
                          </Title>

                          <Form.Item
                            name='otp'
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your OTP!'
                              }
                            ]}
                          >
                            <Input
                              autoComplete='off'
                              className='Input'
                              prefix={
                                <MailOutlined className='site-form-item-icon' />
                              }
                              value={otp}
                              placeholder='OTP Number'
                              type='number'
                            />
                          </Form.Item>

                          <Form.Item>
                            <Button
                              type='primary'
                              htmlType='submit'
                              className='login-form-button'
                              // onClick={() => this.handleSubmit()}
                            >
                              Submit{' '}
                              <ArrowRightOutlined className='loginIcon' />
                            </Button>
                            <span className='login-form-register'>
                              Back to your &nbsp;
                              <span
                                style={{
                                  cursor: 'pointer',
                                  textDecoration: 'underline'
                                }}
                                onClick={() =>
                                  this.props.history.push('/login')
                                }
                              >
                                Sign in <RollbackOutlined />
                              </span>{' '}
                            </span>
                          </Form.Item>
                        </Form>
                      </div>
                    </>
                  )
                },
                {
                  content: (
                    <>
                      <div className='main'>
                        <Form
                          name='normal_login'
                          className='login-form'
                          onFinish={() => this.handleSubmitSigin()}
                        >
                          <Avatar
                            size={54}
                            src='https://i.pinimg.com/564x/95/79/c1/9579c179f04e0f7c52cb3932ec916910.jpg'
                            className='avatar'
                          />
                          <Title level={3} className='title'>
                            Enter your password
                          </Title>

                          <Form.Item
                            name='password'
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your password!'
                              }
                            ]}
                          >
                            <Input.Password
                              autoComplete='off'
                              className='Input'
                              prefix={
                                <LockOutlined className='site-form-item-icon' />
                              }
                              type='password'
                              value={password}
                              placeholder='Current Password'
                            />
                          </Form.Item>
                          <Form.Item
                            name='newpassword'
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your new password!'
                              }
                            ]}
                          >
                            <Input.Password
                              autoComplete='off'
                              className='Input'
                              prefix={
                                <LockOutlined className='site-form-item-icon' />
                              }
                              type='password'
                              value={newpassword}
                              placeholder='New Password'
                            />
                          </Form.Item>

                          <Form.Item>
                            <Button
                              type='primary'
                              htmlType='submit'
                              className='login-form-button'
                              // onClick={() => this.handleSubmit()}
                            >
                              Submit{' '}
                              <ArrowRightOutlined className='loginIcon' />
                            </Button>
                            <span className='login-form-register'>
                              Back to your &nbsp;
                              <span
                                style={{
                                  cursor: 'pointer',
                                  textDecoration: 'underline'
                                }}
                                onClick={() =>
                                  this.props.history.push('/login')
                                }
                              >
                                Sign in <RollbackOutlined />
                              </span>{' '}
                            </span>
                          </Form.Item>
                        </Form>
                      </div>
                    </>
                  )
                }
              ]}
            />
          </Col>
          <Col span={12} className='s-col'>
            <div className='circle-ripple'></div>
            <img
              style={{ width: '100%', height: '100%' }}
              alt='img'
              src='https://s3-eu-central-1.amazonaws.com/centaur-wp/marketingweek/prod/content/uploads/2020/05/20125057/shutterstock_586719869-750x500.jpg'
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default SignIn
