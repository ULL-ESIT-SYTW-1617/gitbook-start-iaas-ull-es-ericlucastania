"use strict";


var express = require('express');
var app = express();
var  path = require('path');
var  expressLayouts = require('express-ejs-layouts');
var proces = require('child_process');





app.set('port', (process.env.PORT || 8080));


app.use(expressLayouts);

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('gh-pages'));


app.get('/', function(request, response){
  response.send('index');  
});


app.post('/syn', function(request, response){
    
    proces.exec("git pull origin master;node app.js", (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      
      response.send(console.log(stdout));
    });
    
});



app.listen(app.get('port'), function() {
  console.log('Node app ejecutandose en el puerto', app.get('port'));
});

module.exports = app;