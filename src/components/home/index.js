import React from 'react'
import { Typography, Input, message, Empty, Button, Select, Spin } from 'antd'
// import { VideoCameraOutlined } from '@ant-design/icons'
import './styled.css'
import AutoPlay from '../slider'
import ModalCom from '../comman/dialogbox'
import LinelistCom from '../lineList'
import { allMoviesTitles, myMoviesTitles } from '../../hooks/query'
import { withApollo } from 'react-apollo'
import moment from 'moment'
const { Title, Text } = Typography
const { Search } = Input
const { Option } = Select
const { TextArea } = Input
class HomeCom extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      searchdata: '',
      selectdata: '',
      selectopen: false,
      listdata: [],
      loader: true
    }
  }
  componentDidMount = async () => {
    await setTimeout(() => this.setState({ loader: false }), 2000)
    this.props.client
      .query({
        query: localStorage.getItem('admin')
          ? allMoviesTitles
          : myMoviesTitles(localStorage.getItem('user_id'))
      })
      .then(response => {
        if (response?.data) {
          const data = response?.data?.allMovieTitles?.nodes?.filter(v => {
            v.registered_date = moment(v?.createdAt).format('DD/MM/YYYY')
            v.img = v?.movieImage
            v.dis = v?.description
            return v
          })
          this.setState({
            listdata: data
          })
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  }
  // Black Panther
  handleSubmit = async e => {
    if (!localStorage.getItem('token')) {
      await message.info('Please sign in to continue...', 5)
      this.props.history.push('/login')
    } else {
      this.setState({
        ...this.state,
        searchdata: e
      })
    }
  }
  handleChanges = e => {
    this.setState({
      ...this.state,
      searchdata: e
    })
  }
  handleopn = () => {
    const state = this.state
    this.setState({
      ...state,
      open: !state.open
    })
  }
  onChange = value => {
    const state = this.state
    this.setState({
      ...state,
      selectdata: value
    })
  }
  handleselectopen = () => {
    const state = this.state
    this.setState({
      ...state,
      selectopen: !state.selectopen
    })
  }
  handlerequest = async () => {
    const state = this.state
    this.setState({
      ...state,
      selectopen: !state.selectopen
    })
    await message.success(
      'Your request has been sended successfully they will get you soon...!',
      5
    )
    this.props.history.push('/admin')
  }
  render () {
    const { open, searchdata, listdata, selectopen, loader } = this.state
    const datas = listdata?.filter(v =>
      v.name ? v.name?.toLowerCase().includes(searchdata.toLowerCase()) : v
    )
    return (
      <div className='drivermain'>
        {loader && (
          <div className='loader'>
            <Spin size='large' />
          </div>
        )}
        {!loader && (
          <>
            <ModalCom
              open={open}
              onCancel={() => this.handleopn()}
              okText={false}
            >
              I'll explain to Soon !
            </ModalCom>
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
                value={searchdata}
                onChange={e => this.handleChanges(e.target.value)}
                onSearch={e => {
                  this.handleSubmit(e)
                }}
                // loading
              />
              <Text className='guidline' onClick={() => this.handleopn()}>
                How to use this
              </Text>
              {searchdata && (
                <LinelistCom searchdata={searchdata} listdata={datas} />
              )}
              {searchdata && !datas?.length > 0 && (
                <div>
                  <Empty />
                  <Button
                    className='pay_btn'
                    // onClick={() => this.handleselectopen()}
                    onClick={() => this.props.history.push('/form')}
                  >
                    Buy Now
                  </Button>{' '}
                </div>
              )}
              <ModalCom
                open={selectopen}
                onCancel={() => this.handleselectopen()}
                okText={false}
              >
                <Select
                  showSearch
                  style={{ width: '100%', margin: '20px 0px' }}
                  placeholder='Choose your plan'
                  onChange={this.onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value='price $100 (1 year of validity)'>
                    price $100 (1 year of validity)
                  </Option>
                  <Option value='price $500 (5 year of validity)'>
                    price $500 (5 year of validity)
                  </Option>
                  <Option value='price $1000 (10 year of validity)'>
                    price $1000 (10 year of validity)
                  </Option>
                </Select>
                <TextArea rows={4} placeholder='Description' />
                <br />
                <Button
                  className='continue_pay_btn'
                  onClick={() => this.handlerequest()}
                >
                  Continue to Buy Now
                </Button>{' '}
              </ModalCom>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default withApollo(HomeCom)
