const app = require('../../index.js')
const request = require('supertest')(app)
const { expect } = require('chai')
const jwt = require('jwt-simple')

describe('Routes: Users', () => {
  const { Users } = app.db.models
  const { jwtSecret } = app.libs.configs.index
  let token

  beforeEach(done => {
    Users
      .destroy({ where: {}})
      .then(() => Users.create({
        name: 'John',
        email: 'john@mail.net',
        password: '12345'
      }))
      .then(user => {
        token = jwt.encode({ id: user.id }, jwtSecret)
        done()
      })
  })

  describe('GET /User', () => {
    describe('status 200', () => {
      it('returns an authenticated user', done => {
        request.get('/user')
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql('John')
            expect(res.body.email).to.eql('john@mail.net')
            done(err)
          })
      })
    })
  })
  describe('POST /Users', () => {
    describe('status 200', () => {
      it('creates a new user', done => {
        request.post('/users')
          .send({
            name: 'Mary',
            email: 'mary@mail.net',
            password: '54321'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql('Mary')
            expect(res.body.email).to.eql('mary@mail.net')
            done(err)
          })
      })
    })
  })
  describe('DELETE user', () => {
    describe('status 204', () => {
      it('removes an authenticated user', done => {
        request.delete('/user')
          .set('Authorization', `bearer ${token}`)
          .expect(204)
          .end((err, res) => done(err))
      })
    })
  })
})