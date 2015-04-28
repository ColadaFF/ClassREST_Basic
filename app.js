(function () {
    "use strict";
    var express = require('express');

    /*
     * Debemos agregar la variable router e inicializarla con express.Router()
     * para pasarla como parametro a nuestros controladores
     */
    var router = express.Router();


    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    var routes = require('./routes/index');
    var users = require('./routes/users');

    var app = express();

    /*
     * Inicializamos nuestro controlador y utilizamos require para decirle a nodeJS
     * donde se encuentra el archivo que vamos a inicializar,
     * por ultimo le pasamos los parametros que recibe nuestra función en el controlador, 
     * los parametros son los de la función module.exports = function(Parametros)
     * en este caso estamos utilizando el router, por los cual lo pasamos entre parentesis
     * despues de ubicar nuestro archivo controlador.
     */
    var controladorProductos = require('./controladores/productos.js')(router);

    /*
     * Por ultimo le decimos a nuestra aplicación cúal va a ser la ruta base de nuestro controlador
     * para esto, utilizamos app.use(), la cual recibe dos parametros, 
     * 1. la ruta base
     * 2. la variable del controlador que inicializamos anteriormente.
     */

    app.use('/servicios', controladorProductos);
    /*
     * Cuando esto está correcto y si nuestro servidor está en ejecución por medio de la orden en CMD
     * nodemon bin/www
     * podemos acceder a nuestro servicio en la ruta: localhost:3000/servicios/productos
     * que son las rutas que definimos aca en la configuración y en nuestro controlador.
     */


// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', routes);
    app.use('/users', users);

// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });


    module.exports = app;
}());