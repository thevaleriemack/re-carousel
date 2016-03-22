import { render } from 'react-dom'

window.requireCommonjs(['carousel.js'], function (Carousel) {
  function App (props) {
    return (
      <div style={{height: '100%'}}>
        <Carousel auto>
          <p style={{backgroundColor: 'royalblue', height: '100%'}}>FRAME 1</p>
          <p style={{backgroundColor: 'orange', height: '100%'}}>FRAME 2</p>
          <p style={{backgroundColor: 'orchid', height: '100%'}}>FRAME 3</p>
        </Carousel>
      </div>
    )
  }

  render(<App/>, document.getElementById('app'))
})
