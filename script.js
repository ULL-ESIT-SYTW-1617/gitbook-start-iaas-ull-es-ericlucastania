"use strict";

module.exports = {

  initialize: () => {
    var shell = require('shelljs');
    var directorioUsuario = process.cwd() + '/';
    var readlineSync = require('readline-sync');
    var path = require('path');
    var fs = require('fs-extra');
    var exp = /\n\ngulp.task\(\'deploy\-iaas(.*\n)*\}\)\;\/\/finish deploy-iaas/gim;
    var directorioPlugin = path.join(__dirname, 'template', 'gulpfile.js');
    var directorioPlugin2 = path.join(__dirname, 'template');


    function descarga() {
      return new Promise(function (resolve, reject) {

        resolve(shell.exec("npm install gitbook-start-plugin-iaas-ull-es-ericlucastania --save"));
      });
    }

    descarga().then((res, rej) => {
      var addArchivos = () => {
        return new Promise((resadd, rejadd) => {


          fs.readFile(directorioUsuario + 'gulpfile.js', "utf-8", (err, data) => {
            if (err) throw err;
            fs.readFile(directorioPlugin, "utf-8", (err, dataDirectorioPlugin) => {
              if (data.match(exp) == null) {
                if (err) throw err;
                fs.appendFile(directorioUsuario + 'gulpfile.js', dataDirectorioPlugin);
              }
              else {
                var dataModificado = data.replace(exp, dataDirectorioPlugin);
                fs.writeFile(directorioUsuario + 'gulpfile.js', dataModificado);
              }
            });
          });

          var frecursiva = (destino, origenArchivo) => {
            try {
              fs.readdir(origenArchivo, (err, files) => {
                if (err) console.log(err);
                files.forEach(files => {
                  var check = origenArchivo + '/' + files;
                  if (fs.statSync(check).isDirectory()) {
                    fs.mkdirSync(destino + '/' + files);
                    frecursiva(destino + '/' + files, check);
                  }
                  else {
                    shell.cp(origenArchivo + '/' + files, destino);
                  }

                });
              });
            }
            catch (e) {
              console.log("Error en copia");
            }

          };

          fs.readdir(directorioPlugin2, (err, files) => {

            if (err) console.log(err);
            var auth = readlineSync.question('¿Quiere solicitar autentificación para que los usuarios puedan acceder a su libro?(s/n): ');
            if ((auth == 's') || (auth == 'S') || (auth == '')) {
              var posapp = files.indexOf("app.js");
              files.splice(posapp, 1);

            }
            else if ((auth == 'n') || (auth == 'N')) {
              var posappAuth = files.indexOf("appAuth.js");
              files.splice(posappAuth, 1);
            }
            else {
              console.log("Opción desconocida.");
            }
            var pos = files.indexOf("gulpfile.js");
            files.splice(pos, 1);

            files.forEach((archivo) => {
              var check = directorioPlugin2 + '/' + archivo;
              if (fs.statSync(check).isDirectory()) {
                fs.mkdirSync(directorioUsuario + '/' + archivo);
                frecursiva(directorioUsuario + '/' + archivo, check);
              }
              else {
                shell.cp(directorioPlugin2 + '/' + archivo, directorioUsuario);
              }
            });
          });
          resadd(claves());
        });
      };
      addArchivos().then(() => {
        shell.exec('git add .;git commit -m "cambios"; git push origin master');
      });
    });


    var claves = () => {
      return new Promise((res, rej) => {
        var pck = require(directorioUsuario + 'package.json');
        shell.exec("rm iaas*; cd ~/.ssh; rm iaas*", function (code, stdout, stderr) {
          if (stderr) {
            console.log("Creando claves");
          }
        });

        shell.exec("ssh-keygen -f iaas");
        shell.exec("ssh-copy-id -i iaas " + pck.iaas.user + "@" + pck.iaas.ip);
        console.log("Clave añadida al fichero authorized_keys\n");
        shell.exec("mv iaas ~/.ssh; mv iaas.pub ~/.ssh", function (code, stdout, stderr) {
          if (stderr) {
            console.log("No se pudo mover las claves");
          }
        });
      });
    };


  },

  deploy: () => {
    var SSH = require('simple-ssh');
    var fs = require('fs-extra');

    var directorioUsuario = process.cwd() + '/';
    var pck = require(directorioUsuario + 'package.json');
    fs.rename(directorioUsuario + '/gh-pages/index.html', directorioUsuario + '/gh-pages/juanito.html', function (err) {
      if (err) throw err;
    });

    var ssh = new SSH({
      host: pck.iaas.ip,
      user: pck.iaas.user,
      agent: process.env.SSH_AUTH_SOCK,
      agentForward: true
    });

    ssh.exec('git clone ' + pck.repository.url + ' gitbook; cd gitbook ;node app*', {
      out: function (stdout) {
        console.log(stdout);
      }
    }).start();
  }


};
