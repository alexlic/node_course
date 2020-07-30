module.exports = app => {
  app.db.sequelize.sync()
  app.listen(app.get('port'), () => {
    console.log(`Ntask API - PORT ${app.get('port')}`)
  })
}
