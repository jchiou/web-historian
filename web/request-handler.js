var path = require('path');
var archive = require('../helpers/archive-helpers');
var initialize = require('./initialize.js');
var fs = require('fs');
var headers = require('./http-helpers');

// require more modules/folders here!
var pathOptions = {
  '/': 'web/public/index.html',
  '/index.html': 'web/public/index.html',
  '/loading.html': 'web/public/loading.html',
  'styles.css': 'web/public/style.css'
};

//modulizing reading file and sending html contents to client
var sendResult = function (path, res) {
  var result = '';
  fs.readFile(path, function (err, data) {
    if (err) { 
      throw err; 
    }
    result += data;
    res.end(result);
  });
};


exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url in pathOptions) {
      sendResult(pathOptions[req.url], res);

    } else {
        //ARCHIVES
    }
    req.on('end', function () {
      res.writeHead(200, headers.headers);
      console.log('onEnd', result.toString());    
    });
    // console.log(result);
        //test if NOT FOUND... 404
  }
};



