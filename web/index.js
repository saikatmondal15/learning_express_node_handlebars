var handlebars = require("handlebars");
var Vision =require('vision');
var Inert = require('inert');
var Wreck = require('wreck');
var mongo = require('mongoskin');
var fs = require("fs");
var db = mongo.db("mongodb://localhost:27017/connect_db", {native_parser:true});
var ObjectID = mongo.ObjectID;
var Request = require("request");

// Create a server with a host and port
exports.register = function (server, options , next ) {
//register view engine
server.register(Vision);
server.register(Inert);

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
	Request("http://localhost:5000/retrieve", function(err, res, body){
            var _body = {title: JSON.parse(body)};
            reply.view("index.html", _body);
	});
    }
});
server.route({
    method: 'GET',
    path: '/edit',
    handler: function (request, reply) {
    var params = request.query.id;
    db.collection("hello_collection").find({"_id":ObjectID(params)}).toArray(function(err, items) {
            
            reply.view('edit.html',items[0]);

                    db.close();
       });;
   	 
    }
});

server.route({
    method: 'GET',
    path: '/delete',
    handler: function (request, reply) {
        var params = request.query.id;
	db.collection("hello_collection").remove({ "_id": ObjectID(params)});
        db.close();
        reply().redirect("/");
    }
    
});


server.route({
    method: 'POST',
    path: '/new_data',
    handler: function (request, reply) {
    var data = request.payload;
     db.collection("hello_collection").insert( { name: data.name, description: data.description, content: data.content  } );

    db.close();
    reply().redirect("/");
       
    }
});
server.route({
    method: 'POST',
    path: '/edit_data',
    handler: function (request, reply) {
    var data = request.payload;
    db.collection('hello_collection').update({ "_id" : ObjectID(data.id) },{$set: { name : data.name, description : data.description , content : data.content } }
);
    db.close();
    reply().redirect("/");
       
    }
});

server.route({
  method: "GET",
  path: "/bower_components/{path1}/{path2}",
  handler: function (request, reply) {
    var Path = "./web/bower_components/" + request.params.path1  +"/" + request.params.path2;
    reply.file(Path); 
  }
});


  return next();
};

exports.register.attributes = { name: 'web' };
