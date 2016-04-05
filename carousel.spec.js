'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _carousel = require('../dist/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('<Carousel /> initial render', function (t) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _carousel2.default,
    { auto: true },
    _react2.default.createElement(
      'div',
      { style: { backgroundColor: 'tomato', height: '100%' } },
      'Frame 1'
    ),
    _react2.default.createElement(
      'div',
      { style: { backgroundColor: 'orange', height: '100%' } },
      'Frame 2'
    ),
    _react2.default.createElement(
      'div',
      { style: { backgroundColor: 'orchid', height: '100%' } },
      'Frame 3'
    )
  ));
  // console.log(wrapper.debug())

  t.same(wrapper.state().auto, true);
  t.same(wrapper.state().total, 3);
  t.same(wrapper.state().current, 0);
  t.same(wrapper.state().vertical, false);
  t.same(wrapper.state().horizontal, true);
  t.same(wrapper.children().nodes.length, 3);
});