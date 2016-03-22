import { render } from 'react-dom'

window.requireCommonjs(['/carousel.js'], function (Carousel) {
  //
  function App (props) {
    console.log(Carousel)
    return (
      <div style={{height: '100%'}}>
        <Carousel auto>
          <div style={{backgroundColor: 'royalblue', height: '100%'}}></div>
          <div style={{backgroundColor: 'orange', height: '100%'}}></div>
        </Carousel>
      </div>
    )
  }

  render(<App/>, document.getElementById('app'))
})
