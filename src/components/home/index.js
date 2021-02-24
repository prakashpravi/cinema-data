import React from 'react'
import { Typography, Input } from 'antd'
// import { VideoCameraOutlined } from '@ant-design/icons'
import './styled.css'
import AutoPlay from '../slider'
import LinelistCom from '../lineList'
const { Title, Text } = Typography
const { Search } = Input
class HomeCom extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  handleSubmit = () => {}
  render () {
    return (
      <div className='drivermain'>
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
            onClick={() => {
              this.handleSubmit()
            }}
            // loading
          />
          <Text className='guidline'>How to use this</Text>
          <LinelistCom />
        </div>
      </div>
    )
  }
}

export default HomeCom
