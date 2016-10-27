"use strict";

module.exports = {
  
  initialize: () => {
    
    var direct = process.cwd() + '/';
    var path = require('path');
    var reg =/deploy-iaas/gi;
    var ruta = path.join(__dirname,'gulpfile.js');
    var fs = require('fs-extra');
    console.log(reg +  " expresion");
    
    fs.readFile(direct + 'gulpfile.js',"utf-8", (err, data) => {
      console.log("entra");
      if (err) throw err;
      console.log("data vale " + data);
      console.log(data.match(reg) + " true or false");
      if(!data.match(reg)){
        console.log("entra");
        
        fs.readFile(ruta, (err, data) => {
          if (err) throw err;
          
          fs.appendFile(direct +'gulpfile.js', data, (err) => {
            if (err) throw err;
          });
          
        });
        
      }
    });
    /*
    require('shelljs/global');
    var pck = require("./package.json");
    try {
      exec("rm iaas*; cd ~/.ssh; rm iaas*");
    } catch (err) {
      console.log("Creando claves");
    }
    
    exec("ssh-keygen -f iaas");
    console.log("Introduzca la clave para configurar la clave authorized_keys \n");
    exec("ssh-copy-id -i iaas " + pck.iaas.user + "@" + pck.iaas.ip);
    console.log("Clave añadida al fichero authorized_keys\n");
    exec("mv iaas ~/.ssh; mv iaas.pub ~/.ssh");*/
    
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
