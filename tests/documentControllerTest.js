var should = require('should');
var sinon = require('sinon');

describe('Document Controller Test', function(){
  describe('Post', function(){
    it('should not allow empty document title', function(){
      //Mock Document object
      var Document = function(book){this.save = function(){}};
      var req = {
        body: {
          author: 'Test Author'
        }
      };
      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };
      var documentController = require('../controllers/documentController')(Document);
      documentController.post(req, res);
      res.status.calledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
      res.send.calledWith('Title required').should.equal(true);
    })
  })
});
