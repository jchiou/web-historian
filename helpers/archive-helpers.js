var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var html = require('../workers/htmlfetcher.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


//////////////outputs an array of urls
exports.readListOfUrls = function(cb) {
  // console.log('readList', exports.paths.list);
  return fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    if (err) { 
      throw err.code;
    } else {
      //split stuff
      var urlArray = data.toString();
      urlArray = urlArray.split('\n');
      // console.log(urlArray);
      cb(urlArray);
    }
  });
};

///traverses array of urls to see if array contains the given url

//returns a cb ON true/False
exports.isUrlInList = function (url, cb) {
  return exports.readListOfUrls(function (urlArray) {
    return cb(_.contains(urlArray, url));
  });
};

exports.addUrlToList = function(url, cb) {
  //check if isUrlInLis
  return exports.isUrlInList(url, function (boolean) {
    if (!boolean) {
      return fs.appendFile(exports.paths.list, url + '\n', function(err) {
        return err ? err : cb(url);
      });
    }
  });
};

exports.isUrlArchived = function(url, cb) {

  // maybe we want a more flexible path than archivedSites
  return fs.stat(path.normalize(exports.paths.archivedSites + '/' + url), function(err, stat) {
    // console.log("is URL archived", path.normalize(exports.paths.archivedSites + '/' + url))
    return err ? cb(false) : cb(true);
  });
};

exports.downloadUrls = function() {
  //do the downloading
  exports.readListOfUrls( function (list) {
    list.forEach( function(url) { 
      //if archived -- don't download;
      //else if not archived
      exports.isUrlArchived(url, function(boolean) {
        if (!boolean) {
          request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
        }
      });
      //fs.write(body) or appendFile
    });
  });
};

