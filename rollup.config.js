import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/carousel.js',
  dest: 'dist/carousel.js',
  format: 'cjs',
  plugins: [ buble(), uglify() ],
  external: ['react', 'react-dom', 'prop-types']
}
