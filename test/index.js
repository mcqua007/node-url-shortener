let mongoose = require('mongoose');
const indexRouter = require('../routes/index');
let Link = require('../models/Link');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('index', () => {
  /*
   * Test the /:code GET route for redirects
   */

  describe('/:code GET request', () => {
    it('it should redirect to shortUrl', done => {
      let data = {
        original: 'https://apple.com/macbook-pro-13/'
      };
      chai
        .request(server)
        .post('/links')
        .send(data)
        .end((err, res) => {
          if (err) return done(err);
          var { shortCode } = res.body.data;
          var { original } = res.body.data;
          chai
            .request(server)
            .get(`/${shortCode}`)
            .redirects(0)
            .end((err, res) => {
              res.header.should.have.property('location').eql(original);
              res.should.have.status(301);
              done();
            });
        });
    });
  });
});
