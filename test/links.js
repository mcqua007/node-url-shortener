let mongoose = require('mongoose');
const links = require('../routes/links');
let Link = require('../models/Link');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('links', () => {
  beforeEach(done => {
    //clear anything in DB before tests
    Link.remove({}, err => {
      done();
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST links', () => {
    it('it should create a links', done => {
      let data = {
        original: 'https://apple.com/macbook-pro-13/'
      };
      chai
        .request(server)
        .post('/links')
        .send(data)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('original').eql('https://apple.com/macbook-pro-13/');
          done();
        });
    });
    //check for originalnot being sent
    it('it should not POST a link without original field', done => {
      let data = {
        shortCode: 'aY645'
      };
      chai
        .request(server)
        .post('/links')
        .send(data)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('original cannot be empty');
          done();
        });
    });
  });

  /*
   * Test the /GET route
   */
  describe('/GET links', () => {
    it('it should GET all the links', done => {
      chai
        .request(server)
        .get('/links')
        .end((err, res) => {
          if (err) return done(err);
          console.log('res', res);
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
});
