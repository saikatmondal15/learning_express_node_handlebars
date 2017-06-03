var handlebars = require("handlebars");
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/connect_db", {native_parser:true});
var ObjectID = mongo.ObjectID;
exports.register = function (server , options , next){
	server.route({
		method: 'GET',
		path: '/retrieve',
		handler : function(request, reply) {
		    if(!request.query.id){		
                           
			db.collection("hello_collection").find({}).toArray(function(err, items){
		 		
		 		reply(items);
				db.close();
			});
			
		     }
		    else{
			 var params = request.query.id;
   			 db.collection("hello_collection").find({"_id":ObjectID(params)}).toArray(function(err, items) {
            
            		  reply(items[0]);

                    db.close();
       });
	
		    }	
         
		}
	
	});
return next();
};
exports.register.attributes = { name : 'api'};
