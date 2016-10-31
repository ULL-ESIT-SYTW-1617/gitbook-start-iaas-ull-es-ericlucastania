"use strict";

module.exports = {
  
  initialize: () => {
    
    var direct = process.cwd() + '/';
    var path = require('path');
    var reg =/deploy-iaas/gi;
    var ruta = path.join(__dirname,'gulpfile.js');
    var fs = require('fs-extra');
  
  
    
    fs.readFile(direct + 'gulpfile.js',"utf-8", (err, data) => {
      if (err) throw err;
      if(data.match(reg) == null){
        
        fs.readFile(ruta, (err, data) => {
          if (err) throw err;
          
          fs.appendFile(direct +'gulpfile.js', data, (err) => {
            if (err) throw err;
          });
          
        });
        
      }
    });
    
    require('shelljs/global');
    var pck = require(process.cwd()+ "/package.json");
    console.log(process.cwd()+ "/package.json");
      try{
        exec("rm iaas*; cd ~/.ssh; rm iaas*", function(code, stdout, stderr) {
            if(stderr){
              console.log("Creando claves");          
            }
        });
      }
      catch(err){
        
      }
    
    
    exec("ssh-keygen -f iaas");
    exec("ssh-copy-id -i iaas " + pck.iaas.user + "@" + pck.iaas.ip);
    console.log("Clave añadida al fichero authorized_keys\n");
    try{
      exec("mv iaas ~/.ssh; mv iaas.pub ~/.ssh",function(code, stdout, stderr) {
            if(stderr){
              console.log("No se pudo mover las claves");          
            }
        });
    }
    catch(err){
      
    }
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
