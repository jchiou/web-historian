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
  '/styles.css': 'web/public/style.css'
};

//modulizing reading file and sending html contents to client
var sendResult = function (path, res, req) {
  var result = '';
  fs.readFile(path, function (err, data) {
    if (err) { 
      throw err; 
    }
    result += data;
    req.on('end', function () {
      res.writeHead(200, headers.headers);
    });
    res.end(result);
  });
};


exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url in pathOptions) {
      sendResult(pathOptions[req.url], res, req);
      //otherwise: its from the webzzz
    } else { 
      ////
      fs.stat(req.url, function(err, stat) {
        // if file exists
        if (err === null) {
          sendResult(archive.paths.archivedSites + req.url, res, req);
        } else {
          // console.log('error', path);
        // make file and add to sites.txt
        }
      });
        //result is going to B wut we gotz in the content already
    }

        //test if NOT FOUND... 404
  }
  res.end('');
   // } else if (req.method === 'POST') {
  //   req.on('data', function(chunk) {
  //     console.log(chunk);
  //   });
  //   req.on('end', function(chunkAgain) {
  //     res.writeHead(201, headers.headers);
  //   });
  //   res.end('');
  // }
};

