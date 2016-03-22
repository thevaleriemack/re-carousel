'use strict';

var _reactDom = require('react-dom');

window.requireCommonjs(['carousel.js', 'indicator-dots.js'], function (Carousel, Dots) {
  function App(props) {
    return React.createElement(
      'div',
      { style: { height: '100%' } },
      React.createElement(
        Carousel,
        { auto: true, indicator: Dots },
        React.createElement(
          'p',
          { style: { backgroundColor: 'royalblue', height: '100%' } },
          'FRAME 1'
        ),
        React.createElement(
          'p',
          { style: { backgroundColor: 'orange', height: '100%' } },
          'FRAME 2'
        ),
        React.createElement(
          'p',
          { style: { backgroundColor: 'orchid', height: '100%' } },
          'FRAME 3'
        )
      )
    );
  }

  (0, _reactDom.render)(React.createElement(App, null), document.getElementById('app'));
});