var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Document = mongoose.model('Document'),
    agent = request.agent(app);

var documentPost;
describe('Document CRUD test', function(){

  describe('Create', function(){
    beforeEach(function(done){
      documentPost = { title: 'Test Title', author: 'Test Author', category: 'Test Category' };
      done();
    });
    it('Should allow creation of a new document, return "_id" and "read" : false with a 201("created") status ', function(done){
      agent.post('/api/documents')
        .send(documentPost).expect(201).end(function(err, res){
          res.body.read.should.equal(false);
          res.body.should.have.property('_id');
          done();
        });
    });
    afterEach(function(done){
      Document.remove().exec();
      done();
    })
  })
//TODO work on this.
  // describe('Read', function(){
  //   documentPost = { title: 'Test Title', author: 'Test Author', category: 'Test Category' };
  //   agent.post('/api/documents').send(documentPost);
  //   it('Should return, _id, __v, title, author, category, description and read', function(done){
  //     agent.get('/api/documents').expect(200).end(function(err, res){
  //       // res.body.read.should.equal(true);
  //       // res.body.should.have.property('_id');
  //       // res.body.should.have.property('__v');
  //       res.body.title.should.equal('Test Title');
  //       res.body.author.should.equal('Test Author');
  //       res.body.category.should.equal('Test Category');
  //       done();
  //     })
  //   })
  // })

  // describe('Update', function(){
  //   var documentPatch = { title: 'Patched Test Title', author: 'Patched Test Author', category: 'Patched Test Category' };
  //   console.log(documentId);
  //   agent.patch('/api/documents/'+ documentId).send(documentPatch);
  //   it('Should return a patched title, author, category and read', function(done){
  //     agent.patch('/api/documents').expect(200).end(function(err, res){
  //       res.body.read.should.equal(false);
  //       res.body.title.should.equal('Patched Test Title');
  //       res.body.author.should.equal('Patched Test Author');
  //       res.body.category.should.equal('Patched Test Category');
  //     })
  //   })
  // })
})
