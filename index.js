/* eslint-disable import/unambiguous */

require('babel-polyfill')

if (process.env.NODE_ENV === 'production') {
  require('./dist')
} else {
  require('./src')
}
