const supertest = require('supertest')
const app = require('../../index.js')
const { expect } = require('chai')

describe('Routes: Index', (done) => {
  let request
  before(() => {
    request = supertest(app)
  })
  describe('GET /', () => {
    it('returns the API status', () => {
      request.get('/')
        .expect(200)
        .end((err, res) => {
          const expected = { status: 'NTask API' }
          expect(res.body).to.eql(expected)
        })
    })
  })
})
