import React from 'react'
import propTypes from 'prop-types'

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative'
  },
  frame: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
}

class Carousel extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      frames: props.frames || props.children || [],
      current: 0
    }

    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.autoSlide = this.autoSlide.bind(this)

    if (props.loop === false && props.auto) {
      console.warn('[re-carousel] Auto-slide only works in loop mode.')
    }
    window.ccc = this
  }

  componentDidMount () {
    this.prepareAutoSlide()

    for (let i = 1; i < this.state.frames.length; i++) {
      this.refs['f' + i].style.opacity = 0
    }
  }

  onTouchStart (e) {
    if (this.state.total < 2) return

    this.stopAutoSlide()
    this.updateFrameSize()
    this.prepareSiblingFrames()

    const { pageX, pageY } = (e.touches && e.touches[0]) || e
    this.setState({
      startX: pageX,
      startY: pageY
    })

    this.refs.wrapper.addEventListener('touchmove', this.onTouchMove, {passive: true})
    this.refs.wrapper.addEventListener('mousemove', this.onTouchMove, {passive: true})
    this.refs.wrapper.addEventListener('touchend', this.onTouchEnd, true)
    this.refs.wrapper.addEventListener('mouseup', this.onTouchEnd, true)
  }

  onTouchMove (e) {
    if (e.touches && e.touches.length > 1) return
    this.stopAutoSlide()

    const { pageX, pageY } = (e.touches && e.touches[0]) || e
    const deltaX = pageX - this.state.startX
    const deltaY = pageY - this.state.startY
    this.setState({
      deltaX: deltaX,
      deltaY: deltaY
    })

    this.moveFramesBy(deltaX, deltaY)
  }

  onTouchEnd () {
    const direction = this.decideEndPosition()
    direction && this.transitFramesTowards(direction)

    // cleanup
    this.refs.wrapper.removeEventListener('touchmove', this.onTouchMove)
    this.refs.wrapper.removeEventListener('mousemove', this.onTouchMove)
    this.refs.wrapper.removeEventListener('touchend', this.onTouchEnd, true)
    this.refs.wrapper.removeEventListener('mouseup', this.onTouchEnd, true)

    this.prepareAutoSlide()
  }

  decideEndPosition () {
    const { deltaX = 0, deltaY = 0, current, frames } = this.state
    const { axis, loop, minMove } = this.props

    switch (axis) {
      case 'x':
        if (loop === false) {
          if (current === 0 && deltaX > 0) return 'origin'
          if (current === frames.length - 1 && deltaX < 0) return 'origin'
        }
        if (Math.abs(deltaX) < minMove) return 'origin'
        return deltaX > 0 ? 'right' : 'left'
      case 'y':
        if (loop === false) {
          if (current === 0 && deltaY > 0) return 'origin'
          if (current === frames.length - 1 && deltaY < 0) return 'origin'
        }
        if (Math.abs(deltaY) < minMove) return 'origin'
        return deltaY > 0 ? 'down' : 'up'
      default:
    }
  }

  moveFramesBy (deltaX, deltaY) {
    const { prev, current, next } = this.state.movingFrames
    const { frameWidth, frameHeight } = this.state

    switch (this.props.axis) {
      case 'x':
        translateXY(current, deltaX, 0)
        translateXY(next, deltaX + frameWidth, 0)
        translateXY(prev, deltaX - frameWidth, 0)
        break
      case 'y':
        translateXY(current, 0, deltaY)
        translateXY(next, 0, deltaY + frameHeight)
        translateXY(prev, 0, deltaY - frameHeight)
        break
      default:
    }
  }

  prepareAutoSlide () {
    this.stopAutoSlide()
    this.updateFrameSize(() => {
      this.prepareSiblingFrames()
    })

    if (this.props.auto) {
      const slideTimeoutID = setTimeout(this.autoSlide, this.props.interval)
      this.setState({ slider: slideTimeoutID })
    }
  }

  // auto slide to 'next' or 'prev'
  autoSlide (rel) {
    switch (rel) {
      case 'prev':
        this.transitFramesTowards(this.props.axis === 'x' ? 'right' : 'down')
        break
      case 'next':
      default:
        this.transitFramesTowards(this.props.axis === 'x' ? 'left' : 'up')
    }

    // prepare next move
    this.prepareAutoSlide()
  }

  next () { this.autoSlide('next') }
  prev () { this.autoSlide('prev') }

  stopAutoSlide () {
    clearTimeout(this.state.slider)
  }

  updateFrameSize (cb) {
    const { width, height } = window.getComputedStyle(this.refs.wrapper)
    this.setState({
      frameWidth: parseInt(width, 10),
      frameHeight: parseInt(height, 10)
    }, cb)
  }

  prepareSiblingFrames () {
    const siblings = {
      current: this.refs['f' + this.getFrameId()],
      prev: this.refs['f' + this.getFrameId('prev')],
      next: this.refs['f' + this.getFrameId('next')]
    }

    if (!this.props.loop) {
      this.state.current === 0 && (siblings.prev = undefined)
      this.state.current === this.state.frames.length - 1 && (siblings.next = undefined)
    }

    this.setState({ movingFrames: siblings })

    // prepare frames position
    translateXY(siblings.current, 0, 0)
    if (this.props.axis === 'x') {
      translateXY(siblings.prev, -this.state.frameWidth, 0)
      translateXY(siblings.next, this.state.frameWidth, 0)
    } else {
      translateXY(siblings.prev, 0, -this.state.frameHeight)
      translateXY(siblings.next, 0, this.state.frameHeight)
    }

    return siblings
  }

  getFrameId (pos) {
    const { frames, current } = this.state
    const total = frames.length
    switch (pos) {
      case 'prev':
        return (current - 1 + total) % total
      case 'next':
        return (current + 1) % total
      default:
        return current
    }
  }

  transitFramesTowards (direction) {
    const { prev, current, next } = this.state.movingFrames
    const { duration, axis } = this.props

    let newCurrentId = this.state.current
    switch (direction) {
      case 'up':
        translateXY(current, 0, -this.state.frameHeight, duration)
        translateXY(next, 0, 0, duration)
        newCurrentId = this.getFrameId('next')
        break
      case 'down':
        translateXY(current, 0, this.state.frameHeight, duration)
        translateXY(prev, 0, 0, duration)
        newCurrentId = this.getFrameId('prev')
        break
      case 'left':
        translateXY(current, -this.state.frameWidth, 0, duration)
        translateXY(next, 0, 0, duration)
        newCurrentId = this.getFrameId('next')
        break
      case 'right':
        translateXY(current, this.state.frameWidth, 0, duration)
        translateXY(prev, 0, 0, duration)
        newCurrentId = this.getFrameId('prev')
        break
      default: // back to origin
        translateXY(current, 0, 0, duration)
        if (axis === 'x') {
          translateXY(prev, -this.state.frameWidth, 0, duration)
          translateXY(next, this.state.frameWidth, 0, duration)
        } else if (axis === 'y') {
          translateXY(prev, 0, -this.state.frameHeight, duration)
          translateXY(next, 0, this.state.frameHeight, duration)
        }
    }

    this.setState({ current: newCurrentId })
  }

  // debugFrames () {
  //   console.log('>>> DEBUG-FRAMES')
  //   const len = this.state.frames.length
  //   for (let i = 0; i < len; ++i) {
  //     const ref = this.refs['f' + i]
  //     console.info(ref.innerText.trim(), ref.style.transform)
  //   }
  // }

  render () {
    const wrapperStyle = objectAssign(styles.wrapper, this.props.style)
    const { frames, current } = this.state
    const Indicator = this.props.indicator

    return (
      <div ref='wrapper' style={wrapperStyle}
        onTouchStart={this.onTouchStart}
        onMouseDown={this.onTouchStart}
        >
        {frames.map((frame, i) => {
          const frameStyle = objectAssign({zIndex: 99 - i}, styles.frame)
          return <div ref={'f' + i} key={i} style={frameStyle}>{frame}</div>
        })}
        {Indicator && <Indicator index={current} total={frames.length} />}
        {this.props.frames && this.props.children}
      </div>
    )
  }
}

Carousel.propTypes = {
  axis: propTypes.oneOf(['x', 'y']),
  auto: propTypes.bool,
  loop: propTypes.bool,
  interval: propTypes.number,
  duration: propTypes.number,
  indicator: propTypes.func,
  frames: propTypes.arrayOf(propTypes.element),
  style: propTypes.object,
  minMove: propTypes.number
}

Carousel.defaultProps = {
  axis: 'x',
  auto: false,
  loop: false,
  interval: 5000,
  duration: 300,
  minMove: 42
}

function translateXY (el, x, y, duration = 0) {
  if (!el) return

  el.style.opacity = '1'

  // animation
  el.style.transitionDuration = duration + 'ms'
  el.style.webkitTransitionDuration = duration + 'ms'

  el.style.transfrom = `translate(${x}px, ${y}px)`
  el.style.webkitTransform = `translate(${x}px, ${y}px) translateZ(0)`
}

function objectAssign (target) {
  var output = Object(target)
  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index]
    if (source !== undefined && source !== null) {
      for (var nextKey in source) {
        if (source.hasOwnProperty(nextKey)) {
          output[nextKey] = source[nextKey]
        }
      }
    }
  }
  return output
}

export default Carousel
