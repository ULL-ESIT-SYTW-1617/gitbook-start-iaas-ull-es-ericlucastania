var iaas = function(){
    
    var node_ssh = require('node-ssh');
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
module.exports.iaas = iaas();

