import React from 'react'

function IndicatorDots (props) {
  const dots = []
  for (let i = 0; i < props.total; i++) {
    const dotStyle = {
      display: 'inline-block',
      height: '8px',
      width: '8px',
      borderRadius: '4px',
      backgroundColor: 'white',
      margin: '7px 5px',
      transitionDuration: '300ms'
    }
    dotStyle.opacity = props.index === i ? '1' : '0.3'
    dots.push(<span key={i} style={dotStyle}></span>)
  }
  return <div style={styles.wrapper}>{dots}</div>
}

IndicatorDots.propTypes = {
  index: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired
}

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: '100',
    bottom: '0px',
    textAlign: 'center'
  }
}

export default IndicatorDots
