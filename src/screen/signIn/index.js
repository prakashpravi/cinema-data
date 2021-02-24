import {
  Button,
  Input,
  message,
  notification,
  Form,
  Avatar,
  Typography,
  Row,
  Col
} from 'antd'
import * as React from 'react'
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
      firstname: null,
      lastname: null,
      password: null,
      mobilenumber: null,
      email: null,
      otp: null,
      newpassword: null,
      current: 0
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
  handleSubmitSigin = async () => {
    await message.loading('Loading....', 5)
    notification.success({
      message: 'Success',
      description: 'Your account created has been successful!'
    })
    this.props.history.push('/home')
  }
  handleSubmit = async () => {
    await message.loading('Loading....', 5)
    this.next()
  }
  render () {
    const {
      firstname,
      lastname,
      current,
      email,
      mobilenumber,
      otp,
      newpassword,
      password
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
                          <Avatar
                            size={54}
                            src='https://i.pinimg.com/564x/95/79/c1/9579c179f04e0f7c52cb3932ec916910.jpg'
                            className='avatar'
                          />
                          <Title level={3} className='title'>
                            Sign Up
                          </Title>
                          <Form.Item
                            name='firstname'
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
                              value={firstname}
                              placeholder='First Name'
                            />
                          </Form.Item>
                          <Form.Item
                            name='lastname'
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your last name!'
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
                              value={lastname}
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
                              value={email}
                              placeholder='Email'
                              type='email'
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
                              value={mobilenumber}
                              placeholder='Mobile Number'
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
                            Enter your change password
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
