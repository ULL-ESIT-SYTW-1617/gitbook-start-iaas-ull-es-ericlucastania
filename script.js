"use strict";

var iaas = () => {
  var pck = require("./package.json");  
  var SSH = require('simple-ssh');
   
  var ssh = new SSH({
      host: pck.iaas.ip,
      user: pck.iaas.user,
      pass: pck.iaas.passwd
  });
   
  ssh.exec(pck.iaas.command, {
      out: function(stdout) {
          console.log(stdout);
      }
  }).start();
};

/*
var iaas = () => {
    
    var node_ssh = require("node-ssh");
    var ssh = new node_ssh();
    var pck = require("./package.json");
    
    ssh.connect({
      host: pck.iaas.ip,
      username: pck.iaas.user
    }).then(function() {
      ssh.execCommand(pck.iaas.command).then(function(result) {
        console.log('STDOUT: ' + result.stdout);
        console.log('STDERR: ' + result.stderr);
      });
    });
};
*/
module.exports.iaas = iaas;

