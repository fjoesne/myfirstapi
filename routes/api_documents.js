var express = require('express');
//document route function.
var documentRoute = function(Document){
  var router = express.Router();
  //document list with support for filtering
  router.route('/')
    .post(function(req, res){
      var document = new Document(req.body);
      console.log(document);
      document.save();
      res.status(201).send(document);
    })
    .get(function(req, res) {
      // filter limit
      var query = {};
      //author filtering
      if (req.query.author) {
        query.author = req.query.author;
      };
      //category filtering
      if (req.query.category){
        query.category = req.query.category;
      };
      Document.find(query, function(err, documents){
        if (err) {
          res.status(500).send(err);
          console.log(err);
        } else {
          res.json(documents);
        }
      });
  });
  // get doc by ID
  router.use('/:docId', function(req, res, next) {
    Document.findById(req.params.docId, function(err, document){
      if (err) {
        res.status(500).send(err);
        console.log(err);
      } else if (document) {
        req.document = document;
        next();
      } else {
        res.status(404).send('Document not found!');
      }
    });
  });
  router.route('/:docId')
    .get(function(req, res) {
      res.json(req.document);
    })
    .put(function(req, res){
      req.document.title = req.body.title;
      req.document.author = req.body.author;
      req.document.category = req.body.category;
      req.document.description = req.body.description;
      req.document.read = req.body.read;
      req.document.save(function(err){
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.document);
        };
      });
    })
    .patch(function(req, res){
      if (req.body._id) {
        //prohibit change of ID
        delete req.body._id;
      };
      for (var i in req.body) {
        req.document[i] = req.body[i];
      };
      req.document.save(function(err){
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.document);
        };
      });
    })
    .delete(function(req,res){
      req.document.remove(function(err){
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send("Removed")
        };
      });
    });
  return router;
};
module.exports = documentRoute;
