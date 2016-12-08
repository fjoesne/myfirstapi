var documentController = function(Document) {

  var post = function(req, res) {
    var document = new Document(req.body);
    //requirements
    if (!req.body.title){
      res.send('Title Requred');
      res.status(400);
      console.log('attempted no title posting, res.status is supposed to be 400');
    // } else if (!req.body.author) {
    //   res.status(400);
    //   res.send('Author Requred');
    // } else if (!req.body.category) {
    //   res.status(400);
    //   res.send('Category Requred');
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
        res.json(documents);
      }
    });
  };
  return {
    post: post,
    get: get
  };
};

module.exports = documentController;
