var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', require('./routes/api'));
app.get('/',function(req, res){
  res.send('My first API');
});
//For development
if (process.env.ENV == 'dev') {
  //ease access to test-results.
  console.log("Running in development mode. exposing test-reports");
  app.use('/test',express.static(path.join(__dirname, '/mochawesome-reports')));
  app.get('/test', function(req, res) {
    res.redirect('/test/mochawesome.html');
  });
};

app.listen(port, function(){
    console.log('Listning on port: '+ port + '\nlink: http://localhost:'+port+'/' );
});

exports.module = app;
