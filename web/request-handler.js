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

//read file; send html; redirect client
var sendResult = function (path, res, req, statusCode) {
  req.on('end', function (chunk) {
    res.writeHead(statusCode, headers.headers);
    //redirect here?
  });
    ///////////HOW TO REDIRECT??!!////////
    //res.redirect('https:' + /* *the filepath*/);
    //////////////////////////////////////
  
  fs.readFile(path, function (err, data) {
    if (err) { 
      throw err; 
    }
    return res.end(data);
  });
  ////where best to place res.end?
};

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    var statusCode = 200;
       //paths for special cases:
    if (req.url in pathOptions) {
      sendResult(pathOptions[req.url], res, req, statusCode);
      //paths for webURLsrn bool;})) { 
    } else if (archive.isUrlArchived(req.url, function (bool) { return bool; })) {
      sendResult(archive.paths.archivedSites + req.url, res, req, statusCode);
    } else {
      statusCode = 404; //REAL STATUS CODE?
      res.writeHead(statusCode, headers.headers);
      res.end({});
      //add the url to the list
      //redirect the usR to the 'waiting' html
    }
  }
};