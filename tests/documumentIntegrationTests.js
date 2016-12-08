var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Document = mongoose.model('Document'),
    agent = request.agent(app);

var documentPost;
describe('Document CRUD test', function(){
  beforeEach(function(done){
    documentPost = {
        title: 'Test Title',
        author: 'Test Author',
        category: 'Test Category'
    };
    done()
  })
  it('Should allow creation of a new document, return "_id" and "read" : false with a 201("created") status ', function(done){
    agent.post('/api/documents')
      .send(documentPost)
      .expect(201)
      .end(function(err, res){
        res.body.read.should.equal(false);
        res.body.should.have.property('_id');
        done()
      })
  })
  afterEach(function(done){
    Document.remove().exec();
    done()
  })
})
