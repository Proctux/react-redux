import '@babel/polyfill'
import 'raf-polyfill'

// Fail tests on any console error
console.error = message => {
  throw new Error(message)
}

window.matchMedia =
  window.matchMedia || // eslint-disable-next-line func-names
  function() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    }
  }
