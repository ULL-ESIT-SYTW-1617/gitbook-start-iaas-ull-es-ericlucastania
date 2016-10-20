"use strict";

module.exports = {

  initialize: () => {
    var fs = require ('fs-extra');
    var exec = require('child_process').execSync;
    var pck = require("./package.json");

    console.log("hola");
    exec("ssh-keygen -f iaas");
    console.log("clave creada");
    /*fs.readFileSync('iaas.pub', (err, data) => {
      console.log("Antes del error");
      if (err) throw err;
      var clave = data;
    });*/
    var clave = fs.readFileSync('iaas.pub');

    exec("ssh-copy-id -i iaas " + pck.iaas.user + "@" + pck.iaas.ip);
    console.log("despues del ssh");

    exec("scp iaas.pub " + pck.iaas.user + "@" + pck.iaas.ip + ":~/.ssh");
    exec("mv iaas ~/.ssh; mv iaas.pub ~/.ssh");
    console.log("todo perfe");

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
