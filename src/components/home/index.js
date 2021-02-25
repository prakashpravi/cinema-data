import React from 'react'
import { Typography, Input, message } from 'antd'
// import { VideoCameraOutlined } from '@ant-design/icons'
import './styled.css'
import AutoPlay from '../slider'
import ModalCom from '../comman/dialogbox'
import LinelistCom from '../lineList'
const { Title, Text } = Typography
const { Search } = Input
class HomeCom extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
  }
  handleSubmit = async () => {
    if (!localStorage.getItem('token')) {
      await message.info('Please sign in to continue...', 5)
      this.props.history.push('/login')
    }
  }
  handleopn = () => {
    const state = this.state
    this.setState({
      open: !state.open
    })
  }
  render () { 
    const { open } = this.state
    return (
      <div className='drivermain'>
        <ModalCom
          open={open}
          onCancel={() => this.handleopn()}
          okText={false}
        >I'll explain to Soon !</ModalCom>
        <AutoPlay />
        <div className='search'>
          <Title level={4} className='title'>
            Title Search
          </Title>
          <Search
            className='search_field'
            placeholder='Search title...'
            enterButton='Search'
            size='large'
            onSearch={() => {
              this.handleSubmit()
            }}
            // loading
          />
          <Text className='guidline' onClick={() => this.handleopn()}>
            How to use this
          </Text>
          <LinelistCom />
        </div>
      </div>
    )
  }
}

export default HomeCom
