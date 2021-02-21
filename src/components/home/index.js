import React from 'react'
import { Typography, Input } from 'antd'
import { VideoCameraOutlined } from '@ant-design/icons'
import './styled.css'
const { Title } = Typography
const { Search } = Input
class HomeCom extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='drivermain'>
        <div className='search'>
          <Title level={4} className='title'>
            Title Search
          </Title>
          <Search
            className='search_field'
            placeholder='Search title...'
            enterButton='Search'
            size='large'
            // loading
          />
        </div>
      </div>
    )
  }
}

export default HomeCom
