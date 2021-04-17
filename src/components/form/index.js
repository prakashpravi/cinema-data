import {
  Row,
  Col,
  Form,
  Typography,
  Select,
  Input,
  Card,
  Button,
  Upload,
  message,
  notification,
  Spin
} from 'antd'
import * as React from 'react'
import './form.css'
import { withApollo } from 'react-apollo'
import moment from 'moment'
import { uuid } from 'uuidv4'

import { userProfileById, createMovieTitle } from '../../hooks/query'
const { Title } = Typography
const { Option } = Select
class Forms extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: null,
      mobile_no: null,
      email: null,
      birthday: null,
      moviename: null,
      validity: null,
      description: null,
      movieImage: null,
      fileList: [],
      loader: true
    }
  }
  componentDidMount = async () => {
    await setTimeout(() => this.setState({ loader: false }), 2000)
    this.props.client
      .query({
        query: userProfileById(localStorage.getItem('user_id'))
      })
      .then(response => {
        if (response?.data) {
          const data = response?.data?.userProfileById
          this.setState({
            name: data?.firstName + ' ' + data?.lastName,
            mobile_no: data?.mobileNo,
            birthday: moment(data?.birthday).format('YYYY-MM-DD'),
            email: data?.email
          })
        }
      })
      .catch(err => {
        message.error('Faild to fetch data', 5)
      })
  }
  setInputValue = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  onChange = value => {
    const state = this.state
    this.setState({
      ...state,
      validity: value
    })
  }
  handleSubmit = async () => {
    const { moviename, description, validity, movieImage } = this.state
    if (!movieImage) {
      message.error('Please upload the movie image', 5)
      return false
    }
    const data = {
      'price $100 (1 year of validity)': '100',
      'price $500 (5 year of validity)': '500',
      'price $1000 (10 year of validity)': '1000'
    }
    await message.loading('Loading....', 5)
    this.props.client
      .mutate({
        mutation: createMovieTitle(
          moviename,
          data[validity],
          description,
          movieImage,
          uuid(),
          localStorage.getItem('user_id'),
          moment(new Date()).format('YYYY-MM-DD')
        )
      })
      .then(res => {
        console.log(res)
        notification.success({
          message: 'Success',
          description: 'Your details has been successful!'
        })
        this.setState({ ...this.state })
        this.props.history.push('/home')
      })
      .catch(err => {
        message.error('Faild to fetch data', 5)
      })
  }
  getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    return reader.readAsDataURL(img)
  }
  handleChange = e => {
    if (!e.file.originFileObj) {
      return
    }
    this.getBase64(e.file.originFileObj, imageUrl => {
      this.setState({
        fileList: [
          {
            uid: '-1',
            name: e.file.name,
            status: 'done',
            url: imageUrl
          }
        ],
        movieImage: imageUrl
      })
    })
  }

  render () {
    const {
      name,
      mobile_no,
      email,
      birthday,
      moviename,
      validity,
      description,
      fileList,
      loader
    } = this.state
    return (
      <div className='main-form'>
        <br />
        <br />
        {loader && (
          <div className='loader'>
            <Spin size='large' />
          </div>
        )}
        {!loader && (
          <>
            {' '}
            <Card title='Personal Details' className='cards'>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                  <Title level={5} className='titles'>
                    User Name
                  </Title>
                  <Input
                    style={{ width: '96%' }}
                    placeholder='User Name'
                    className='filed'
                    disabled
                    value={name}
                    size='large'
                  />
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                  <Title level={5} className='titles'>
                    Date of birth
                  </Title>
                  <Input
                    style={{ width: '96%' }}
                    placeholder='Please input'
                    className='filed'
                    disabled
                    size='large'
                    value={birthday}
                  />
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                  <Title level={5} className='titles'>
                    Email
                  </Title>
                  <Input
                    style={{ width: '96%' }}
                    placeholder='Please input'
                    className='filed'
                    disabled
                    size='large'
                    value={email}
                  />
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                  <Title level={5} className='titles'>
                    Mobile Number
                  </Title>
                  <Input
                    style={{ width: '96%' }}
                    placeholder='Please input'
                    className='filed'
                    disabled
                    size='large'
                    value={mobile_no}
                  />
                </Col>
              </Row>
            </Card>
            <Card title='Movie Details' className='cards'>
              <Form
                name='normal_login'
                className='login-form'
                onFinish={() => this.handleSubmit()}
              >
                <Row gutter={16}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Title level={5} className='titles'>
                      Movie Image
                    </Title>
                    <Upload
                      onChange={e => this.handleChange(e)}
                      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                      fileList={fileList}
                      multiple={false}
                      listType='picture-card'
                      onRemove={() =>
                        this.setState({
                          fileList: [],
                          movieImage: null
                        })
                      }
                    >
                      + Upload
                    </Upload>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Title level={5} className='titles'>
                      Movie Name
                    </Title>

                    <Form.Item
                      name='moviename'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your movie name!'
                        }
                      ]}
                    >
                      <Input
                        autoFocus
                        style={{ width: '96%' }}
                        autoComplete='off'
                        className='Input'
                        onChange={e =>
                          this.setInputValue('moviename', e.target.value)
                        }
                        size='large'
                        value={moviename}
                        placeholder='Movie Name'
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Title level={5} className='titles'>
                      Choose your plan
                    </Title>
                    <Form.Item
                      name='validity'
                      rules={[
                        {
                          required: true,
                          message: 'Please select your validity!'
                        }
                      ]}
                    >
                      <Select
                        showSearch
                        allowClear
                        style={{ width: '96%' }}
                        placeholder='Choose yor plan'
                        size='large'
                        onChange={this.onChange}
                        // onFocus={onFocus}
                        // onBlur={onBlur}
                        // onSearch={onSearch}
                        value={validity}
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
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Title level={5} className='titles'>
                      Enter your description
                    </Title>
                    <Form.Item
                      name='description'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your description!'
                        }
                      ]}
                    >
                      <Input.TextArea
                        style={{ width: '96%' }}
                        onChange={e =>
                          this.setInputValue('description', e.target.value)
                        }
                        value={description}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  Proceed to Buynow
                </Button>
              </Form>
            </Card>
          </>
        )}
      </div>
    )
  }
}
export default withApollo(Forms)
