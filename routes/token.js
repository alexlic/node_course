const jwt = require('jwt-simple')

module.exports = app => {
  const cfg = app.libs.configs.index
  const { Users } = app.db.models
  /**
   * @api {post} /token Authentication Token
   * @apiGroup Credentials
   * @apiParam {String} email User email
   * @apiParam {String} password User password
   * @apiParamExample {json} Input
   *  {
   *    "email": "jill.valentine@stars.com",
   *    "password": "12345"
   *  }
   * @apiSuccess {String} token Token of authenticated user
   * @apiSuccessExample {json} Authentication Success
   *  HTTP/1.1 200 OK
   *  {"token": "xyz.abc.123.hgf"}
   * @apiErrorExample {json} Authenticated error
   *  HTTP/1.1 401 Unauthorized
   */
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
