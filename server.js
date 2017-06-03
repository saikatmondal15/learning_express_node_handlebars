var Glue = require('glue');



var manifest = {
  connections: [{
    host: "localhost",
    port: "4000",
    labels: ['web']
  }, {
    host: "localhost",
    port: "5000",
    labels: ['api'],
    routes:{
      cors: true  
    }
  }
],
  registrations: [{
    plugin: {
      register: './web'
    },
    options: {
      select: ['web']
    }
  }, {
    plugin: {
      register: './api',
    },
    options: {
      select: ['api']
    }
  }]
};

var options = {
  relativeTo: __dirname,
};

Glue.compose(manifest, options, function(err, server) {
  if (err) {
    throw err;
  }

  server.start(function() {
    console.log('Start The Fucking Server!');
  });
});

