module.exports = app => {
  app.listen(app.get('port'), () => {
    console.log(`Ntask API - PORT ${app.get('port')}`)
  })
}
