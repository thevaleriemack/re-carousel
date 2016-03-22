# re-carousel

React carousel component, simplified. Only 7KB when minified, zero dependency.

demo: https://amio.github.io/re-carousel/

### Usage

`import Carousel from 're-carousel'` then:

```html
<Carousel auto>
  <div style={{backgroundColor: 'indigo', height: '100%'}}>Frame 1</div>
  <div style={{backgroundColor: 'orange', height: '100%'}}>Frame 2</div>
  <div style={{backgroundColor: 'orchid', height: '100%'}}>Frame 3</div>
</Carousel>
```

### Attributes

All attributes are optional.

- `axis` {enum} `'x'` or `'y'` (`'x'` by default)
- `auto` {boolean} `true` or `false` (`false` by default) toggle auto sliding.
- `interval` {number} (`4000`ms by default) interval for auto sliding.
- `duration` {number} (`300`ms by default) duration for animation.
- `indicator` {ReactClass} Indicator could be various, so it's not built within the Carousel. You may use this [dots indicator](src/indicator-dots.js) or make your own:
  ```javascript
  import Carousel from 're-carousel'
  import IndicatorDots from 're-carousel/indicator-dots'

  <Carousel auto indicator={IndicatorDots}>
    <div style={{backgroundColor: 'indigo', height: '100%'}}>Frame 1</div>
    <div style={{backgroundColor: 'orange', height: '100%'}}>Frame 2</div>
    <div style={{backgroundColor: 'orchid', height: '100%'}}>Frame 3</div>
  </Carousel>
  ```
