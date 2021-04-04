import React from 'react'
import {
  PageHeader,
  Upload,
  Breadcrumb,
  Dropdown,
  Menu,
  Drawer,
  Input
} from 'antd'
import { UserOutlined, LockOutlined, DownOutlined } from '@ant-design/icons'
import './styled.css'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      username: 'Black Panther',
      password: 'Black Panther'
    }
  }
  logout = () => {
    localStorage.removeItem('token')
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
  render () {
    const { open, username, password } = this.state
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
              style={{ borderRadius: 20 }}
              listType='picture-card'
              showUploadList={false}
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            >
              <img
                src={
                  'data:image/jpeg;base64,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'
                }
                alt='avatar'
                style={{ width: '100%', objectFit: 'cover', height: '100%' }}
              />{' '}
            </Upload>
            <br /> <br />{' '}
            <Input
              autoFocus
              autoComplete='off'
              className='Input'
              prefix={<UserOutlined className='site-form-item-icon' />}
              value={username}
              size='large'
              onChange={e => this.handlechange('username', e.target.value)}
              placeholder='Username'
            />
            <br />
            <br />{' '}
            <Input.Password
              value={password}
              autoComplete='off'
              className='Input'
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              onChange={e => this.handlechange('password', e.target.value)}
              size='large'
              placeholder='Password'
            />
          </div>
        </Drawer>
        <PageHeader
          ghost={false}
          title={
            <Breadcrumb separator={false} className='Breadcrumb'>
              <Breadcrumb.Item className='home'>
                <img
                  alt='img'
                  style={{
                    width: '38px',
                    position: 'absolute',
                    marginTop: -8
                  }}
                  src='assets/TITLES (2).png'
                />
              </Breadcrumb.Item>

              <div className='center_of'>
                <Breadcrumb.Item
                  className='home active'
                  onClick={() => this.props.history.push('/home')}
                >
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item className='home'>Prices</Breadcrumb.Item>
                <Breadcrumb.Item className='home'>About</Breadcrumb.Item>
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
                </Menu>
              }
            >
              <span
                style={{
                  cursor: 'pointer'
                }}
              >
                {' '}
                More
                <DownOutlined
                  style={{
                    fontSize: '15px',
                    margin: '4px 0px 0px 2px',
                    position: 'absolute'
                  }}
                />
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

export default Header
