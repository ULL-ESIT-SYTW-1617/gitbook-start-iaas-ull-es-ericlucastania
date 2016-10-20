"use strict";

module.exports = {
  
  initialize: () => {
    console.log("hola");
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


