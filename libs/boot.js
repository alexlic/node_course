module.exports = app => {
  if (process.env.NODE_ENV !== 'test') {
    app.db.sequelize.sync()
    app.listen(app.get('port'), () => {
      console.log(`Ntask API - PORT ${app.get('port')}`)
    })
  }
}
