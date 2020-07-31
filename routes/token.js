const jwt = require('jwt-simple')

module.exports = app => {
  const cfg = app.libs.configs.index
  const { Users } = app.db.models
  app.post('/token', (req, res) => {
    if (req.body.email && req.body.password) {
      const { email, password } = req.body
      Users.findOne({ where: { email } })
        .then(user => {
          if (Users.isPassword(user.password, password)) {
            const payload = { id: user.id }
            res.json({
              token: jwt.encode(payload, cfg.jwtSecret)
            })
          } else {
            res.sendStatus(401)
          }
        })
        .catch(error => {
          console.log(error)
          res.sendStatus(401)
        })
    } else {
      res.sendStatus(401)
    }
  })
}
