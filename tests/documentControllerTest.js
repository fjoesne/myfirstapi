var should = require('should');
var sinon = require('sinon');

describe('Document Controller Test', function(){
  describe('Post', function(){
    var Document = function(book){this.save = function(){}};
    var req;
    var res = {
      status: sinon.spy(),
      send: sinon.spy()
    };
    var documentController = require('../controllers/documentController')(Document);

    beforeEach(function(done){
      //reset the body.
      req = { body: { title: 'Test Title', author: 'Test Author', category: 'Test Category' }};
      done();
    })
    it('Should not allow document without title', function(){
      delete req.body.title;
      documentController.post(req, res);
      res.status.calledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
      res.send.calledWith('Title required').should.equal(true);
    })
    it('Should not allow document without author', function(){
      delete req.body.author;
      documentController.post(req, res);
      res.status.calledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
      res.send.calledWith('Author required').should.equal(true);
    })
    it('Should not allow document without category', function(){
      delete req.body.category;
      documentController.post(req, res);
      res.status.calledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
      res.send.calledWith('Author required').should.equal(true);
    })
  })
});
