"use strict";


var express = require('express');
var app = express();
var  path = require('path');
var  expressLayouts = require('express-ejs-layouts');
var proces = require('child_process');
var https = require('https');
var pck = require('./package.json');
var fs = require('fs-extra');


https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'hola'
}, app).listen(8080, () => {
  console.log("Enlace al libro...");
  console.log("https://" + pck.iaas.ip + ":8080");
});


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


module.exports = app;
