
const defaultConfigs = {
  api: {
    gateway: 'https://app.theeye.io/api',
    core: 'https://supervisor.theeye.io'
  }
}

export default (() => {
  let configs
  if (window && window.configs) {
    // replace configs
    return Object.assign({}, defaultConfigs, window.configs)
  } else {
    return defaultConfigs
  }
})()
