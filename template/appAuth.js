"use strict";


var datos = require("./datos.json");
var node_dropbox = require('node-dropbox-copia');
var api = node_dropbox.api(datos.dropbox.token_dropbox);

var express = require('express');
var app = express();
var bcrypt = require("bcrypt-nodejs");
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Strategy = require('passport-github').Strategy;
var boolGithub = false;
var boolLocal = false;

passport.use(new Strategy({
  clientID: datos.github.id,
  clientSecret: datos.github.secret,
  callbackURL: datos.github.callback + '/login/github/return'
}, function (accessToken, refreshToken, profile, cb) {
  var github = require('octonode');
  var client = github.client(datos.github.token);
  var ghorg = client.org(datos.github.organization);
  ghorg.member(profile.username, function (err, bool) {

    boolGithub = bool;
    if (err) console.log(err);
  });
  return cb(null, profile);
}));

function buscarNombre(usuario, password, cb) {
  var datos;

  var funcion = function () {
    return new Promise((res, rej) => {
      api.getFile('/datos.json', function (e, data, body) {
        res(datos = body);
      });
    });
  };

  funcion().then(res => {
    if (datos[usuario].username == usuario && bcrypt.compareSync(password, datos[usuario].pass)) {


      boolLocal = true;
      console.log(boolLocal);
      cb(null, datos[usuario]);
    }
    else {
      cb(null);
    }
  });

}



passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  function (username, password, done) {
    buscarNombre(username, password, function (err, user) {
      if (err) {
        return done(err, null);
      }
      else {
        return done(null, user);
      }
    });
  }
));


// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});




app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'gh-pages')));

app.set('port', (process.env.PORT || 8080));

app.set('view engine', 'ejs');



app.use(passport.initialize());
app.use(passport.session());

//routes


app.get('/', function (req, res) {

  res.render('home', {
    user: req.user
  });

});

app.get('/book', function (req, res) {
  if (req.user && (boolGithub || boolLocal))
    res.sendfile('gh-pages/juanito.html');
  else if (req.user)
    res.render('error');
  else
    res.render('login');



});

app.get('/loginLocal', function (req, res) {
  res.render('loginLocal');
});

app.get('/cambiarpass', function (req, res) {
  res.render('cambiarpass');
});

app.get('/home', function (req, res) {
  res.render('home', {
    user: req.user
  });
});

app.get('/registro', function (req, res) {
  res.render('registro', {
    user: req.user
  });
});






app.post('/cambiarpass', function (req, res) {
  var pass = req.body.Password;
  var passnew = req.body.Passwordnew1;
  var passnew1 = req.body.Passwordnew2;
  var user = req.body.username;
  var hash = bcrypt.hashSync(passnew);
  var x;

  if (passnew == passnew1) {
    var funcion = function () {
      return new Promise((res, rej) => {
        api.getFile('/datos.json', function (e, data, body) {
          res(x = body);
        });
      });
    };
    funcion().then(respu => {
      new Promise((resp, rej) => {
        if (bcrypt.compareSync(pass, x[user].pass)) {
          x[user].pass = hash;
          resp(api.createFile('/datos.json', x, function (e, b, c) {
            if (e) console.log(e);
            else
              res.render('login');
          }));
        }
        else {
          res.render("error");
        }
      });
    });
  }
  else
    res.redirect('cambiarpass');
});

app.get('/login', function (req, res) {

  app.get('/profile', function (req, res) {
    res.render('home');
  });

  res.render('login');
});

app.get('/login/github', passport.authenticate('github'));

app.get('/login/github/return', passport.authenticate('github', {
  failureRedirect: '/login'
}), function (req, res) {
  res.redirect('/');
});

app.post('/auth', passport.authenticate('local', {
  failureRedirect: "/login"
}), function (req, res) {
  res.redirect("/");
});

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function (req, res, next) {
  res.render('profile', {
    user: req.user
  });
});

app.post('/guardar', function (req, res) {
  if (req.body.Password == req.body.Password2) {

    var obj = {
      [req.body.UserName]: {
        "username": req.body.UserName,
        "pass": bcrypt.hashSync(req.body.Password)
      }
    };
  }
  else {
    res.render('/registro');


  }
  var x;
  var funcion = function () {
    return new Promise((res, rej) => {
          api.getFile('/datos.json', function (e, data, body) {
            if(e) console.log(e);
            if(body.error != null)
              x = {};
            else
              x = body;
              
            res(x);
          });
      
    });

  };



  funcion().then(res => {
    x[req.body.UserName] = obj[req.body.UserName];

    new Promise((res, rej) => {
      res(api.createFile('/datos.json', x, function (e, b, c) {
        if (e) console.log(e);
      }));
    });

  });


  res.redirect('/');
});



app.listen(app.get('port'), function () {
  console.log('Node app ejecutandose en el puerto', app.get('port'));
});

module.exports = app;
