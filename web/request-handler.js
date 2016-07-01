var path = require('path');
var archive = require('../helpers/archive-helpers');
var initialize = require('./initialize.js');
var fs = require('fs');
var headers = require('./http-helpers');

// require more modules/folders here!
var pathOptions = {
  '/': '/index.html',
  '/index.html': '/index.html',
  '/loading.html': '/loading.html',
  '/styles.css': '/styles.css'
};

//read file; send html; redirect client
var sendResult = function (path, res, req, statusCode) {
  req.on('end', function (chunk) {
    headers.headers.Location = path;
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
      sendResult(archive.paths.siteAssets + pathOptions[req.url], res, req, statusCode);
      //paths for new URLs
    } else {
      // if it's alreadyy archived
      archive.isUrlArchived(req.url, function (bool) { 
        if (bool === true) {
          statusCode = 200;
          sendResult(archive.paths.archivedSites + '/' + req.url, res, req, statusCode);
          //if we aint got it archived
        } else {
          var statusCode = 404; //REAL STATUS CODE?

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
    console.log('posted, bitch');
    req.on('data', function(chunk) {
      ////REMEMBER THAT THIS IS A NAIVE SOLUTION ('url=' + google.com)
      var postUrl = chunk.toString().slice(4);
      archive.isUrlArchived(postUrl, function (bool) { 
        if (bool === true) {
          sendResult(archive.paths.archivedSites + '/' + postUrl, res, req, 302);
          //if we aint got it archived
        } else {
          archive.addUrlToList(postUrl, function() {
            console.log('cbFunk');
            headers.headers.Location = pathOptions['/loading.html'];
            res.writeHead(302, headers.headers);
            res.end('');
          });
        }
      });
    });
  }
};

  console.log(pathOptions['/loading.html'])