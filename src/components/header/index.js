import React from 'react'
import { PageHeader, Avatar, Breadcrumb, Dropdown, Menu } from 'antd'
import './styled.css'

class Header extends React.Component {
  state = {}
  render () {
    return (
      <div className='headermain'>
        <PageHeader
          ghost={false}
          title={
            <Breadcrumb separator='>' className='Breadcrumb'>
              <Breadcrumb.Item
                className='home'
                onClick={() => this.props.history.push('/home')}
              >
                Home
              </Breadcrumb.Item>
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
                    onClick={() => this.props.history.push('/login')}
                  >
                    {' '}
                    Logout{' '}
                  </Menu.Item>
                </Menu>
              }
            >
              <Avatar
                className='avatar_icon'
                src='https://i.pinimg.com/564x/95/79/c1/9579c179f04e0f7c52cb3932ec916910.jpg'
              />
            </Dropdown>
          ]}
        />
      </div>
    )
  }
}

export default Header
