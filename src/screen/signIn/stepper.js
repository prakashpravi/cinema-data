import { Steps } from 'antd'
import * as React from 'react'
import './styled.css'
const { Step } = Steps
class Stepper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { steps, current } = this.props
    return (
      <div className='stepper_login'>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className='steps-content'>{steps[current].content}</div>
      </div>
    )
  }
}

export default Stepper
