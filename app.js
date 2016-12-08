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

app.use(express.static(path.join(__dirname, '/mochawesome-reports')));

app.listen(port, function(){
    console.log('Listning on port: '+ port + '\nlink: http://localhost:'+port+'/' );
});
