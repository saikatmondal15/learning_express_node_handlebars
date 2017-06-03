var Glue = require('glue');
var Hapi = require('hapi');



var manifest = {
  connections: [{
    host: "localhost",
    port: "4000",
    labels: ['web']
  }],
  registrations: [{
    plugin: {
      register: './web',
      options: {
         config: {} 
       }
    },
    options: {
      select: ['web']
    }
  }]
};

var options = {
  relativeTo: __dirname,
};

Glue.compose(manifest, options, function(err, server) {
  console.log("check this out");
  if (err) {
    console.log(err);
    throw err;
  }

  server.start(function() {
    console.log('Start The Fucking Server!');
  });
});

