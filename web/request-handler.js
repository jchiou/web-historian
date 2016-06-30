var path = require('path');
var archive = require('../helpers/archive-helpers');
var initialize = require('./initialize.js');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //

  fs.stat(archive.paths.archivedSites + '/' + req.url, function(err) {
    if (err) {
      throw err;
    }
    fs.readFile(archive.paths.archivedSites + '/' + req.url, function(err, data) {
      if (err) { console.log( err) };
      console.log("data is", data.toString());
    });
  } );

  if (req.method === 'GET') {
    req.on('end', function() {
      //what are we doing with this?!
      //add urlToList
      //go into the path, check if its there, 
      //if it is, return the whole content of that fils

      // if (fs.stat(archive.paths.archivedSites + '/' + req.url, function () {//
   
      // })) {
      //   //go to the path
      //   console.log('heyyy grrl heyy')
      //   //get the text content of the specified and Stringify it.
      //   // var result = fs.readfile(file, optionalThing);
      //   // JSON.stringify(result);
      //   // //append file to data
      //   // fs.appendfile(fileToAppendTo, req.url);
      // }
      res.writeHead('');

    });
  }
 //archive.paths.list
  res.end();
};

// console.log(__dirname);

