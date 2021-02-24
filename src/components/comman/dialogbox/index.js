import React from 'react'
import { Modal } from 'antd'
import './styled.css'
class ModalCom extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const {
      open,
      children,
      onOk,
      onCancel,
      okTextTitle,
      titleText,
      footer
    } = this.props
    return (
      <Modal
        className='modal-of-com'
        title={titleText && titleText}
        style={{ top: 20 }}
        visible={open && open}
        onOk={() => onOk && onOk()}
        onCancel={() => onCancel && onCancel()}
        okText={okTextTitle && okTextTitle}
        footer={footer && footer}
      >
        {children}
      </Modal>
    )
  }
}

export default ModalCom
