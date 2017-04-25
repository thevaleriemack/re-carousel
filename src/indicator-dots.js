import React from 'react'
import propTypes from 'prop-types'

export default function IndicatorDots (props) {
  const wrapperStyle = {
    position: 'absolute',
    width: '100%',
    zIndex: '100',
    bottom: '0px',
    textAlign: 'center'
  }
  // Hide dots when there is only one dot.
  if (props.total < 2) return <div style={wrapperStyle} />

  const dots = []
  for (let i = 0; i < props.total; i++) {
    dots.push(<Dot key={i} selected={props.index === i} />)
  }
  return <div style={wrapperStyle}>{dots}</div>
}

IndicatorDots.propTypes = {
  index: propTypes.number.isRequired,
  total: propTypes.number.isRequired
}

function Dot (props) {
  return (
    <span style={{
      display: 'inline-block',
      height: '8px',
      width: '8px',
      borderRadius: '4px',
      backgroundColor: 'white',
      margin: '7px 5px',
      opacity: props.selected ? '1' : '0.3',
      transitionDuration: '300ms'
    }} />
  )
}

Dot.propTypes = {
  selected: propTypes.bool
}
