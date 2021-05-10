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
  // LockOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import '../login/styled.css'
const { Title } = Typography
class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: localStorage.getItem('admin')
        ? localStorage.getItem('user_name')
        : localStorage.getItem('user_id_login'),
      password: ''
    }
  }

  setInputValue = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  handleSubmit = async () => {
    debugger
    const aaa = !localStorage.getItem('admin') ? 'id' : 'username'
    const bbb = !localStorage.getItem('admin') ? 'otp' : 'password'
    await message.loading('Login In....', 5)
    fetch('http://193.164.132.55:3001/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        [aaa]: this.state.username,
        [bbb]: this.state.password
      })
    })
      .then(data => {
        return data.json()
      })
      .then(response => {
        if (response.info === 'login sucess') {
          notification.success({
            message: 'Success',
            description: 'User login has been successful!'
          })
          localStorage.setItem('token', response?.token)
          localStorage.setItem('user_id', response?.data?.id)
          this.props.history.push('/home')
        } else {
          message.error('Faild to login', 5)
        }
      })
      .catch(error => {
        message.error('Faild to login', 5)
        console.log(error, 5)
      })
  }
  render () {
    const { password } = this.state
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
                  src='assets/TITLES (2).png'
                  className='avatar'
                />
                <Title level={3} className='title'>
                  Sign In
                </Title>
                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message:
                        localStorage.getItem('admin') === '1'
                          ? 'Please enter your password'
                          : 'Please enter your otp'
                    }
                  ]}
                >
                  <Input
                    autoFocus
                    autoComplete='off'
                    className='Input'
                    onChange={e =>
                      this.setInputValue('password', e.target.value)
                    }
                    prefix={<UserOutlined className='site-form-item-icon' />}
                    value={password}
                    placeholder={
                      localStorage.getItem('admin') === '1'
                        ? 'please enter password'
                        : 'please enter otp'
                    }
                  />
                </Form.Item>
                {/* <Form.Item
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
                    onChange={e =>
                      this.setInputValue('password', e.target.value)
                    }
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Password'
                  />
                </Form.Item> */}
                <Form.Item style={{ margin: 0 }}>
                  {/* <Form.Item name='remember' valuePropName='checked' noStyle>
                    <span className='login-form-keep'>Keep me login</span>
                  </Form.Item> */}

                  {/* <span
                    className='login-form-forgot'
                    onClick={() => this.props.history.push('/forget')}
                  >
                    Forgot password
                  </span> */}
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
                  {/* <span className='login-form-register'>
                    You don't have an account?
                    <span
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => this.props.history.push('/signin')}
                    >
                      SignUp
                    </span>
                  </span> */}
                </Form.Item>
              </Form>
            </div>
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
