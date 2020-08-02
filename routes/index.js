module.exports = app => {
  /**
   * @api {get} / API status
   * @apiGroup status
   * @apiSuccessExample {json} success
   * HTTP/1.1 200 OK
   * {"status": "NTask API"}
   */

  app.get('/', (req, res) => res.json({ status: 'NTask API' }))
}
