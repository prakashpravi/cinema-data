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
    await message.loading('Loading....', 5)
    notification.success({
      message: 'Success',
      description: 'Your password forget has been successful!'
    })
    this.props.history.push('/home')
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
                Back to your login &nbsp;
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
