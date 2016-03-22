'use strict';

var _reactDom = require('react-dom');

window.requireCommonjs(['carousel.js'], function (Carousel) {
  function App(props) {
    return React.createElement(
      'div',
      { style: { height: '100%' } },
      React.createElement(
        Carousel,
        { auto: true },
        React.createElement(
          'div',
          { style: { backgroundColor: 'indigo', height: '100%' } },
          'Frame 1'
        ),
        React.createElement(
          'div',
          { style: { backgroundColor: 'orange', height: '100%' } },
          'Frame 2'
        ),
        React.createElement(
          'div',
          { style: { backgroundColor: 'orchid', height: '100%' } },
          'Frame 3'
        )
      )
    );
  }

  (0, _reactDom.render)(React.createElement(App, null), document.getElementById('app'));
});