"use strict";

module.exports = {

  initialize: () => {
    var fs = require ('fs-extra');
    var exec = require('child_process').execSync;
    var pck = require("./package.json");

    exec("ssh-keygen -f iaas");
    console.log("Introduzca la clave para configurar la clave authorized_keys \n");
    exec("ssh-copy-id -i iaas " + pck.iaas.user + "@" + pck.iaas.ip);
    console.log("Clave añadida al fichero authorized_keys\n");
        console.log("Introduzca la clave una última vez para configurar la clave publica \n");

    exec("scp iaas.pub " + pck.iaas.user + "@" + pck.iaas.ip + ":~/.ssh");
    console.log("Fichero con la clave publica subido al servidor");
    exec("mv iaas ~/.ssh; mv iaas.pub ~/.ssh");
  },

  deploy: () => {
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
