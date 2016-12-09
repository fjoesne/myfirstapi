var documentController = function(Document) {

  var post = function(req, res) {
    var document = new Document(req.body);
    if (!req.body.title){
      res.status(400);
      res.send('Title required');
    } else if (!req.body.author) {
      res.status(400);
      res.send('Author required');
    } else if (!req.body.category) {
      res.status(400);
      res.send('Category required');
    } else {
      //commit
      document.save();
      res.status(201);
      res.send(document);
    }
  };

  var get = function(req, res) {
    var query = {};
    //author filtering
    if (req.query.author) {
      query.author = req.query.author;
    };
    //category filtering
    if (req.query.category){
      query.category = req.query.category;
    };
    // query
    Document.find(query, function(err, documents){
      if (err) {
        res.status(500).send(err);
        console.log(err);
      } else {
        var returnDocuments = [];
        documents.forEach(function(element, index, array){
          var hateoasDocument = element.toJSON();
          hateoasDocument.links = {};
          hateoasDocument.links.self = 'http://'+ req.headers.host +'/api/documents/'+hateoasDocument._id;
          returnDocuments.push(hateoasDocument);
        });
        res.json(returnDocuments);
      }
    });
  };
  return {
    post: post,
    get: get
  };
};

module.exports = documentController;
