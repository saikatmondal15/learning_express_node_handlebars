var handlebars = require("handlebars");
var Vision =require('vision');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/connect_db", {native_parser:true});
var ObjectID = mongo.ObjectID;

// Create a server with a host and port
exports.register = function (server, options , next ) {
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


  return next();
};

exports.register.attributes = { name: 'web' };
