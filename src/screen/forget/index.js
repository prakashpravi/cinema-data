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
import { MailOutlined } from '@ant-design/icons'
const { Title } = Typography
class Forget extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: null
    }
  }
  handleSubmit = async () => {
    await message.loading('Loding...', 5)
    fetch('http://3.141.17.227:3001/api/forget_password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email
      })
    })
      .then(data => {
        return data.json()
      })
      .then(response => {
        if (response.info === 'email send successfully') {
          notification.success({
            message: 'Success',
            description: 'Your email sended successful!'
          })
          this.props.history.push('/passwordchange')
          localStorage.setItem('forget_id', response?.data?.id)
        } else {
          message.error('Faild', 5)
        }
      })
      .catch(error => {
        message.error(error, 5)
      })
  }
  setInputValue = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  render () {
    const { email } = this.state
    return (
      <div className='workspace'>
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
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please enter your mail!'
                }
              ]}
            >
              <Input
                size='large'
                autoFocus
                autoComplete='off'
                className='Input'
                prefix={<MailOutlined />}
                value={email}
                onChange={e =>
                  this.setInputValue('email', e.target.value)
                }
                placeholder='example@gmail.com'
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
export default Forget
