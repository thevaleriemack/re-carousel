import React from 'react'
import ReactDOM from 'react-dom'
import Carousel from './carousel'
import Dots from './indicator-dots'
import Buttons from './buttons'
import Callback from './callback-example'

// Main App
class App extends React.Component {
  constructor () {
    super()
    this.state = {
      axis: 'x',
      callbackData: null
    }
    this.setAxis = axis => {
      return () => this.setState({'axis': axis})
    }
    this.setCallbackData = data => {
      this.setState({callbackData: data}, () => {
        console.log("this.state.callbackData:", this.state.callbackData)
      })
    }
  }
  render () {
    return (
      <div style={{height: '100%'}}>
        <header>
          <span className={this.state.axis === 'x' ? 'axis current' : 'axis'}
            onClick={this.setAxis('x')}>horizontal</span>
          <span className={this.state.axis === 'y' ? 'axis current' : 'axis'}
            onClick={this.setAxis('y')}>vertical</span>
        </header>
        <Carousel
          auto
          axis={this.state.axis}
          widgets={[Dots, Buttons, Callback]}
          callback={this.setCallbackData}
          className="custom-class">
          <p style={{backgroundColor: 'royalblue', height: '100%'}}>FRAME 1</p>
          <p style={{backgroundColor: 'orange', height: '100%'}}>FRAME 2</p>
          <p style={{backgroundColor: 'orchid', height: '100%'}}>FRAME 3</p>
        </Carousel>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
