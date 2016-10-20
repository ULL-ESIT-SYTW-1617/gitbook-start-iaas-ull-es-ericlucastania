"use strict";

module.exports = {
  
  initialize: () => {
    var fs = require ('fs-extra');
    var exec = require('child_process').exec;
    var pck = require("./package.json");

    console.log("hola");
    exec("cd ~/.ssh; ssh-keygen -f iaas");
    fs.readFile('~/.ssh/iaas.pub', (err, data) => {
      if (err) throw err;
      var clave = data;
    });
    exec("scp iaas.pub pck.iaas.user@pck.iaas.ip:~/.ssh");
    
  },
  
  iaas: () => {
    var pck = require("./package.json");  
    var SSH = require('simple-ssh');
     
    var ssh = new SSH({
        host: pck.iaas.ip,
        user: pck.iaas.user,
        agent: process.env.SSH_AUTH_SOCK,
        agentForward: true
    });
     
    ssh.exec(pck.iaas.command, {
        out: function(stdout) {
            console.log(stdout);
        }
    }).start();
  }
  
  
};


