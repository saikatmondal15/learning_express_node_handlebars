var Hapi = require('hapi');
var handlebars = require("handlebars");
var Vision =require('vision');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 5000 
});

//register view engine
server.register(Vision);

server.views({
    engines: {
        'html': handlebars
    },
    relativeTo :__dirname,
    path: 'views',
    isCached: false
   });

// Add the route
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        var body = {title: "hello from index page"};
        reply.view('index.html', body);
    }
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
        var body = {title: "hello from hello page"}; 
        reply.view('hello.html', body);
    }
});

// Start the server
server.start(function(err) {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
