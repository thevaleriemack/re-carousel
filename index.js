'use strict';

var _reactDom = require('react-dom');

window.requireCommonjs(['/carousel.js'], function (Carousel) {
  //
  function App(props) {
    console.log(Carousel);
    return React.createElement(
      'div',
      { style: { height: '100%' } },
      React.createElement(
        Carousel,
        { auto: true },
        React.createElement('div', { style: { backgroundColor: 'royalblue', height: '100%' } }),
        React.createElement('div', { style: { backgroundColor: 'orange', height: '100%' } })
      )
    );
  }

  (0, _reactDom.render)(React.createElement(App, null), document.getElementById('app'));
});