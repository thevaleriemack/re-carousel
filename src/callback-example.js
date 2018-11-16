import React from 'react'

export default class CallbackExample extends React.Component {
  componentDidUpdate (prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.index !== prevProps.index && this.props.index === this.props.total - 1) {
      this.props.callback("We are at the end!")
    }
  }
  render() {
    return(<div>Hello, callback!</div>)
  }
}
