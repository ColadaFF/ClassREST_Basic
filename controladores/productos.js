(function (module) {
    "use strict";
    module.exports = function (router) {
        
        /*
         * utilizamos el parametro router que recibimos al inicio de la función
         * y a este le asignamos los diferentes metodos HTTP.
         * ej: router.post()
         * las funciones que creemos, recibes dos parametros, 
         * 1. la ruta donde va a estar disponible nuestro recurso
         * 2. la funcion que recibe la petición (request) y al respuesta (response) de nuestro servicio.
         */
        router.get('/productos', function(request, response){
            
            /*
             * devolvemos un mensaje utilizando el return y la respuesta,
             * en este caso return response, luego le pasamos el estado HTTP de la respuesta,
             * en este caso 200 porque es exitoso, por ultimo le entregamos en formato JSONP nuestra respuesta.
             */
            return response.status(200).jsonp({
                "mensaje" : "Hola!"
            });
        });
        return router;
    };
}(module));


