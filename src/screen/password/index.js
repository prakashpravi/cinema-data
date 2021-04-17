import {
  Row,
  Typography,
  Input,
  message,
  notification,
  Form,
  Button
} from 'antd'
import * as React from 'react'
import { ArrowRightOutlined, RollbackOutlined } from '@ant-design/icons'
import './styled.css'
const { Title } = Typography
class PasswordChange extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      password: null,
      otp: null
    }
  }
  setInputValue = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  handleSubmit = async () => {
    await message.loading('Loding...', 5)
    fetch('http://3.141.17.227:3001/api/new_password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: this.state.password,
        otp: this.state.otp,
        id: localStorage.getItem('forget_id')
      })
    })
      .then(data => {
        return data.json()
      })
      .then(response => {
        if (response.info === 'password change successfully') {
          notification.success({
            message: 'Success',
            description: 'Your password change successfully!'
          })
          this.props.history.push('/login')
        } else {
          message.error('Faild', 5)
        }
      })
      .catch(error => {
        message.error(error, 5)
      })
  }

  render () {
    const { otp, password } = this.state
    return (
      <div className='passwordchange'>
        <Row className='workspacelog'>
          <Title level={5} className='dis_title'>
            Forget password
          </Title>
          <Form
            name='normal_login'
            className='login-form'
            onFinish={() => this.handleSubmit()}
          >
            <Form.Item
              name='otp'
              rules={[
                {
                  required: true,
                  message: 'Please enter your otp!'
                }
              ]}
            >
              <Input
                size='large'
                autoFocus
                autoComplete='off'
                className='Input'
                value={otp}
                placeholder='Please enter OTP'
                onChange={e => this.setInputValue('otp', e.target.value)}
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
                size='large'
                autoFocus
                autoComplete='off'
                className='Input'
                value={password}
                type='password'
                placeholder='Please enter password'
                onChange={e => this.setInputValue('password', e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                Submit <ArrowRightOutlined className='loginIcon' />
              </Button>
              <span className='login-form-register'>
                Back to your sign in &nbsp;
                <span
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => this.props.history.push('/login')}
                >
                  Login <RollbackOutlined />
                </span>{' '}
              </span>
            </Form.Item>
          </Form>
        </Row>
      </div>
    )
  }
}
export default PasswordChange
