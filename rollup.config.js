import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'src/carousel.js',
  output: {
    file: 'dist/carousel.js',
    format: 'cjs'
  },
  plugins: [ buble(), uglify() ],
  external: ['react', 'react-dom', 'prop-types']
}
