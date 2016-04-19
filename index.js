'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactDom = require('react-dom');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

window.requireCommonjs(['carousel.js', 'indicator-dots.js'], function (Carousel, Dots) {
  // Main App

  var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
      _classCallCheck(this, App);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

      _this.state = {
        axis: 'x'
      };
      _this.setAxis = function (axis) {
        return function () {
          _this.setState({ 'axis': axis });
        };
      };
      return _this;
    }

    _createClass(App, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { style: { height: '100%' } },
          React.createElement(
            'div',
            { style: styles.header },
            React.createElement(
              'span',
              { className: this.state.axis === 'x' ? 'axis current' : 'axis',
                onClick: this.setAxis('x') },
              'horizontal'
            ),
            React.createElement(
              'span',
              { className: this.state.axis === 'y' ? 'axis current' : 'axis',
                onClick: this.setAxis('y') },
              'vertical'
            )
          ),
          React.createElement(
            Carousel,
            { auto: true, indicator: Dots, axis: this.state.axis },
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
    }]);

    return App;
  }(_react.Component);

  var styles = {
    header: {
      zIndex: 100,
      position: 'absolute',
      width: '100%',
      height: '80px',
      lineHeight: '80px',
      color: '#DDD',
      textAlign: 'center'
    }
  };

  (0, _reactDom.render)(React.createElement(App, null), document.getElementById('app'));
});