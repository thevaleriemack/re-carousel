import { render } from 'react-dom'

window.requireCommonjs(['carousel.js'], function (Carousel) {
  function App (props) {
    return (
      <div style={{height: '100%'}}>
        <Carousel auto>
          <div style={{backgroundColor: 'royalblue', height: '100%'}}>11</div>
          <div style={{backgroundColor: 'orange', height: '100%'}}>22</div>
          <div style={{backgroundColor: 'orchid', height: '100%'}}>33</div>
        </Carousel>
      </div>
    )
  }

  render(<App/>, document.getElementById('app'))
})
