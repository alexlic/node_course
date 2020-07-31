const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

let db

module.exports = app => {
  if (!db) {
    const config = app.libs.configs.index
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    )
    db = {
      sequelize,
      Sequelize,
      models: {}
    }
    const dir = path.join(__dirname, 'models')
    fs.readdirSync(dir).forEach(file => {
      const modelDir = path.join(dir, file)
      const model = require(modelDir)(sequelize, Sequelize)
      db.models[model.name] = model
    })
  }
  return db
}
