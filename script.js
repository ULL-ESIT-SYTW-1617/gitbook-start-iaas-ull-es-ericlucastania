"use strict";

module.exports = {
  
  initialize: () => {
    
    var direct = process.cwd() + '/';
    var path = require('path');
    var reg =/deploy-iaas/gi;
    var ruta = path.join(__dirname,'gulpfile.js');
    var fs = require('fs-extra');
    
    
    fs.readFile(direct + 'gulpfile.js', (err, data) => {
      if (err) throw err;
      
      if(!data.match(reg)){
        
        fs.readFile(ruta, (err, data) => {
          if (err) throw err;
          
          fs.appendFile(direct +'gulpfile.js', data, (err) => {
            if (err) throw err;
          });
          
        });
        
      }
    });
    
    
    

    
    require('shelljs/global');
    var pck = require("./package.json");

    exec("rm iaas*; cd ~/.ssh; rm iaas*");
    exec("ssh-keygen -f iaas");
    console.log("Introduzca la clave para configurar la clave authorized_keys \n");
    exec("ssh-copy-id -i iaas " + pck.iaas.user + "@" + pck.iaas.ip);
    console.log("Clave añadida al fichero authorized_keys\n");
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
