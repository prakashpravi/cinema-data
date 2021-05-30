import {
  Button,
  Input,
  message,
  // notification,
  Form,
  Avatar,
  Typography,
  Row,
  Col,
  Select,
  Radio
} from 'antd'
import * as React from 'react'
import {
  // UserOutlined,
  // LockOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import './styled.css'
const { Title } = Typography
const { Option } = Select
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      categroy: '',
      radio: 'Admin'
    }
  }
  componentDidMount () {
    localStorage.clear()
  }
  setInputValue = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  handleSubmit = async () => {
    var bodyPayload
    if (this.state.radio === 'User') {
      bodyPayload = {
        username: this.state.username,
        user_category: this.state.categroy
      }
    } else {
      bodyPayload = {
        username: this.state.username
      }
    }
    await message.loading('Login In....', 5)
    fetch('http://193.164.132.55:3001/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyPayload)
    })
      .then(data => {
        return data.json()
      })
      .then(response => {
        if (
          response.info === 'valid  user' ||
          response.info === 'email send successfully'
        ) {
          // notification.success({
          //   message: 'Success',
          //   description: 'User login has been successful!'
          // })
          // localStorage.setItem('token', response?.token)
          localStorage.setItem('user_id_login', response?.data?.id)
          localStorage.setItem('user_name', this.state.username)
          if (response?.data?.role_id === 1) {
            localStorage.setItem('admin', response?.data?.role_id)
          }
          this.props.history.push('/signin')
          // window.location.pathname = '/signin'
        } else {
          message.error('Faild to login', 5)
        }
      })
      .catch(error => {
        message.error('Faild to login', 5)
        console.log(error, 5)
      })
  }
  onChangeRadio = e => {
    this.setState({ radio: e.target.value })
  }
  render () {
    const {
      username,
      // categroy,
      radio
    } = this.state
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
                <Radio.Group
                  onChange={e => this.onChangeRadio(e)}
                  value={radio}
                >
                  <Radio value={'Admin'}>Admin</Radio>
                  <Radio value={'User'}>User</Radio>
                </Radio.Group>
                <br />
                <br />
                {this.state.radio === 'User' && (
                  <Form.Item
                    name='categroy'
                    rules={[
                      {
                        required: true,
                        message: 'Please select category'
                      }
                    ]}
                  >
                    <Select
                      style={{
                        width: '100%',
                        margintBottom: 40,
                        textAlign: 'left'
                      }}
                      allowClear
                      showSearch
                      placeholder='Please select category'
                      onChange={e => this.setInputValue('categroy', e)}
                    >
                      {[
                        'Thenandal films',
                        'Five star films',
                        'Studio 9',
                        'Maruthi films ',
                        'Mannan films',
                        'Shri mishri production'
                      ].map(v => {
                        return <Option value={v}>{v}</Option>
                      })}
                    </Select>
                  </Form.Item>
                )}

                <Form.Item
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your userid / mail!'
                    }
                  ]}
                >
                  <Input
                    autoFocus
                    autoComplete='off'
                    className='Input'
                    onChange={e =>
                      this.setInputValue('username', e.target.value)
                    }
                    // prefix={<UserOutlined className='site-form-item-icon' />}
                    value={username}
                    placeholder='user id / mail'
                  />
                </Form.Item>

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
                    Submit <ArrowRightOutlined className='loginIcon' />
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

export default Login
