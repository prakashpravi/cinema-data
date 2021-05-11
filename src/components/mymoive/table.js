import { Table, Input, Popconfirm, notification, message } from 'antd'
import React from 'react'
import { withApollo } from 'react-apollo'
import { updatetabledata } from '../../hooks/query'
import moment from 'moment'
const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input
        style={{ margin: '-5px 0' }}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    ) : (
      value
    )}
  </div>
)

class EditableTable extends React.Component {
  constructor (props) {
    super(props)
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'englishTitleName',
        width: '25%',
        render: (text, record) => this.renderColumns(text, record, 'englishTitleName')
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: '15%',
        render: (text, record) =>
          this.renderColumns(text, record, 'description')
      },
      {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        width: '40%',
        render: (text, record) => this.renderColumns(text, record, 'createdAt')
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => {
          const { editable } = record
          return (
            <div className='editable-row-operations'>
              {editable ? (
                <span>
                  <b onClick={() => this.save(record.key)}>Save</b>&nbsp;
                  <Popconfirm
                    title='Sure to cancel?'
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <b>Cancel</b>
                  </Popconfirm>
                </span>
              ) : (
                <b onClick={() => this.edit(record.key)}>Edit</b>
              )}
            </div>
          )
        }
      }
    ]
    this.state = { data: this.props.data }
    this.cacheData = this.props.data.map(item => ({ ...item }))
  }
  renderColumns (text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    )
  }
  handleChange (value, key, column) {
    const newData = [...this.state.data]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      target[column] = value
      this.setState({ data: newData })
    }
  }
  edit (key) {
    const newData = [...this.state.data]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      target.editable = true
      this.setState({ data: newData })
    }
  }
  save (key) {
    const newData = [...this.state.data]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      delete target.editable
      this.setState({ data: newData })
      this.cacheData = newData.map(item => ({ ...item }))
      newData.map(item => {
        return this.props.client
          .mutate({
            mutation: updatetabledata(
              item.englishTitleName,
              item.price,
              item.description,
              item.id,
              localStorage.getItem('user_id'),
              moment(new Date()).format('YYYY-MM-DD')
            )
          })
          .then(res => {
            console.log(res)
            notification.success({
              message: 'Success',
              description: 'Your details has been successfully updated!'
            })
          })
          .catch(err => {
            message.error('Faild to fetch data', 5)
          })
      })
    }
  }
  cancel (key) {
    const newData = [...this.state.data]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
      delete target.editable
      this.setState({ data: newData })
    }
  }
  render () {
    return (
      <Table bordered dataSource={this.state.data} columns={this.columns} />
    )
  }
}
export default withApollo(EditableTable)
