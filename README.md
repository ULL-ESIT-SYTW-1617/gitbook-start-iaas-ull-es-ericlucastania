# Práctica IAAS[PLUGIN]



  
## Descripción de la práctica.

 
El objetivo de la práctica es llegar a que el usuario puede descargar el plugin ``` gitbook-start-iaas-ull-es-ericlucastania``` y el paquete ``` gitbook-start-elt ```
de manera local en su maquina.El usuario tiene que tener en cuenta que tiene que tener previamente un cuenta en el iaas y tener un clone de su repositorio.
Una vez que se tiene claro los anteriores comenzamos a explicar los pasos llevar a cabo el correcto funcionamiento de la práctica

###Pasos a seguir

* Comprobar que tienes cuenta en el iaas,en caso de no tener cuenta no podrás llevar a cabo la práctica
  * [Enlace al login del iaas](https://iaas.ull.es/ovirt-engine/sso/login.html)






## Pasos a ejecutar 

**1. Instala nuestro paquete de forma global**

```npm install -g gitbook-start-elt```

**2. Instala el plugin del iaas de forma global**

```npm install -g gitbook-start-plugin-iaas-ull-es-ericlucastania```

**3. Ejecuta el binario para el render del template**

```gitbook-start --dir Carpeta``` !!Si no ejecutas el --dir se creará una carpeta con tu nombre de usuario

**4. Entra en la carpeta**

 ```cd Carpeta```

**5. Cambia los datos del package.json que tiene el directorio que has creado en nuestro caso de llama Carpeta**


### Instrucciones de uso

Tenga en cuenta que para que el plugin funcione correctamente debe cambiar algunas cosas en el package.json


![](https://4.bp.blogspot.com/-Jjhh_IM9FAw/WA9EbkzsEoI/AAAAAAAAAoc/84cO_lVXgCYD6ekx1YzSV6LEjsCitH0AACLcB/s1600/iass.png)
* Deberá poner la IP de su maquina del iaas.

![](https://4.bp.blogspot.com/-qb-f3r0EpJ0/WA9IiJ-XjjI/AAAAAAAAAoo/aDSCiupjFeIOQ3WumKTtT5FIKK9FtxU1wCLcB/s1600/ip.png)
* Para que el pull funcione correctamente en su máquina, deberá cambiar la ruta que aparece en command por la suya.

![](https://3.bp.blogspot.com/-aLZatT4SRmI/WA9IiHbUGXI/AAAAAAAAAos/9-J7a9pH7ZkLwDPSqh_TPV74Svitx2xlQCLcB/s1600/command.png)
* Tenga en cuenta que si el usuario de su máquina no es "usuario" deberá también cambiar esto en el fichero package.json

![](https://4.bp.blogspot.com/-Ls3DTGAHQ7E/WA9IjVnGOqI/AAAAAAAAAow/BANS15EoXqYuVwIChWcSqZvqlkcLxtMRQCLcB/s1600/usuario.png)

**6. Ejecuta el plugin que desees**

```gitbook-start -d iaas``` !! También puedes usar la opción --deploy


**7. Ejecuta un npm install**

```npm install```


**7. Ejecuta el gulp creado**

Recuerde que si ejecuta un pull deberá tener clonado primero el repositorio en la máquina del iaas

```gulp deploy-iaas```

#### Explicación

Cunado se ejecuta el gitbook-start -d iaas se te lanzará el initialize del módulo,
el initialize crea una tarea en el gulp para realizar el deploy. Además de guardarte el paquete
elegido en el package.json.

## Opciones

    gitbook-start [OPTIONS]
        -d nombre del directorio a crear node gitbook-star -d miDirectorio
        -a autor del libro a crear node gitbook-star -a AutorDelLibro
        -e email del autor del libro node gitbook-star -e eric.ramos.suarez@gmail.com
        -r repositorio github contra el que se va a trabajar -r nameRepo
        -v muestra la version del paquete gitbook-start -v
        -h muestra ayuda sobre las opciones disponibles






## Enlaces interesantes

* [Repositorio Práctica](https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-plugin-iaas-ull-es-ericlucastania) 
* [Descripción de la práctica](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicaplugin.html)
* [PLUGIN IAAS](https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-iaas-ull-es-ericlucastania)
* [NPM PLUGIN IAAS](https://www.npmjs.com/package/gitbook-start-plugin-iaas-ull-es-ericlucastania)

## Componentes del grupo de trabajo
* [Eric Ramos](https://github.com/alu0100786330)
* [Lucas Ruiz](https://github.com/alu0100785265)
* [Tania González](https://github.com/tania77)


