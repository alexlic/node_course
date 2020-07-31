const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')

module.exports = app => {
  const { Users } = app.db.models
  const cfg = app.libs.config
  const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }
  const strategy = new Strategy(params, (payload, done) => {
    Users.findByPk(payload.id)
      .then(user => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email
          })
        }
        return done(null, false)
      })
      .catch(err => done(err, null))
  })
  passport.use(strategy)
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', cfg.jwtSession)
  }
}