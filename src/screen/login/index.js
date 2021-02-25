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
  ArrowRightOutlined
} from '@ant-design/icons'
import './styled.css'
const { Title } = Typography
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: null,
      password: null
    }
  }

  setInputValue = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  handleSubmit = async () => {
    await message.loading('Login In....', 5)
    notification.success({
      message: 'Success',
      description: 'User login has been successful!'
    })
    localStorage.setItem('token', 'token')
    this.props.history.push('/home')
  }
  render () {
    const { username, password } = this.state
    return (
      <div className='main-login'>
        <Row style={{ height: '100%' }}>
          <Col md={{ span: 24 }} lg={{ span: 12 }} className='f-col'>
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
                  Sign In
                </Title>
                <Form.Item
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your username!'
                    }
                  ]}
                >
                  <Input
                    autoFocus
                    autoComplete='off'
                    className='Input'
                    prefix={<UserOutlined className='site-form-item-icon' />}
                    value={username}
                    placeholder='Username'
                  />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'please enter your password!'
                    }
                  ]}
                >
                  <Input.Password
                    value={password}
                    autoComplete='off'
                    className='Input'
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Password'
                  />
                </Form.Item>
                <Form.Item style={{ margin: 0 }}>
                  {/* <Form.Item name='remember' valuePropName='checked' noStyle>
                    <span className='login-form-keep'>Keep me login</span>
                  </Form.Item> */}

                  <span
                    className='login-form-forgot'
                    onClick={() => this.props.history.push('/forget')}
                  >
                    Forgot password
                  </span>
                </Form.Item>

                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                    // onClick={() => this.handleSubmit()}
                  >
                    Log in <ArrowRightOutlined className='loginIcon' />
                  </Button>
                  <span className='login-form-register'>
                    You don't have an account?{' '}
                    <span
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => this.props.history.push('/signin')}
                    >
                      SignUp
                    </span>{' '}
                  </span>
                </Form.Item>
              </Form>
            </div>{' '}
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

export default Login
