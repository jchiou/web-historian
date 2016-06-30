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
    ///////////HOW TO REDIRECT??!!////////
    //res.redirect('https:' + /* *the filepath*/);
    //////////////////////////////////////
  });
  
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
      //paths for new URLs
    } else {
      // if it's alreadyy archived
      archive.isUrlArchived(req.url, function (bool) { 
        if (bool === true) {
          statusCode = 200;
          console.log('its archived', req.url);
          sendResult(archive.paths.archivedSites + '/' + req.url, res, req, statusCode);
          //if we aint got it archived
        } else {
          var statusCode = 404; //REAL STATUS CODE?
          console.log('404url', req.url);
          res.writeHead(statusCode, headers.headers);
          //add the url to the list
          archive.addUrlToList(req.url, function(x) { return x; }, function (v) { return v; });
          //redirect the usR to the 'waiting' html
          //res.redirect()
          res.end('');
          ///YO, we maybe should POST at this pt
        }
      });
      
    }


  } else if (req.method === 'POST') {
    var statusCode = 302;
    req.on('data', function(chunk) {
      ////REMEMBER THAT THIS IS A NAIVE SOLUTION ('url=' + google.com)
      var chunker = chunk.toString().slice(4);
      archive.addUrlToList(chunker, function() {
        res.writeHead(statusCode, headers.headers);
        res.end('');
      });
    });
  }
};

console.log(path.normalize("//google.com"))