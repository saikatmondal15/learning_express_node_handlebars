var Hapi = require('hapi');
var handlebars = require("handlebars");
var Vision =require('vision');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/connect_db", {native_parser:true});

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


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        db.collection("hello_collection").find().toArray(function(err, items) {
          var body = {title: items};
          reply.view('index.html', body);
          db.close();
       }); 
    }
});



server.route({
    method: 'POST',
    path: '/new_data',
    handler: function (request, reply) {
    var data = request.payload;
    console.log(data.name);
    console.log(data.description);
    console.log(data.content);
    db.collection("hello_collection").insert( { name: data.name, description: data.description, content: data.content  } );
       
    }
});

// Start the server
server.start(function(err) {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
