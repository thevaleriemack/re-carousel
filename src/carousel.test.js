import React from 'react'
import ReactDOM from 'react-dom'
import Carousel from './carousel'

global.it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render((
    <Carousel auto axis={'x'}>
      <p style={{backgroundColor: 'royalblue', height: '100%'}}>FRAME 1</p>
      <p style={{backgroundColor: 'orange', height: '100%'}}>FRAME 2</p>
      <p style={{backgroundColor: 'orchid', height: '100%'}}>FRAME 3</p>
    </Carousel>
  ), div)
})
