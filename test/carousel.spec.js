import test from 'ava'
import { shallow } from 'enzyme'
import React from 'react'
import Carousel from '../dist/carousel'

test('<Carousel /> initial render', t => {
  const wrapper = shallow(
    <Carousel auto>
      <div style={{backgroundColor: 'tomato', height: '100%'}}>Frame 1</div>
      <div style={{backgroundColor: 'orange', height: '100%'}}>Frame 2</div>
      <div style={{backgroundColor: 'orchid', height: '100%'}}>Frame 3</div>
    </Carousel>
  )

  t.same(wrapper.state().auto, true)
  t.same(wrapper.state().total, 3)
  t.same(wrapper.state().current, 0)
  t.same(wrapper.state().vertical, false)
  t.same(wrapper.state().horizontal, true)
  t.same(wrapper.children().nodes.length, 3)
})
