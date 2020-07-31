module.exports = app => {
  const { NODE_ENV } = process.env
  if (NODE_ENV) {
    return require(`./${NODE_ENV}.js`)
  }
  return require('./development.js')
}
