var archive = require('../helpers/archive-helpers');
var cron = require('cron').CronJob;
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.








/////////////////////////////////
////FILTER pre-downloaded files

exports.filterUrlFiles = function () {
  var filteredUrls = [];
  //for ea url in the exports.pathslist text
  archive.readListOfUrls(function (urlArray) {
    //check to see if exports.isUrlArchived
    urlArray.forEach(
      archive.isUrlArchived (url, function(boolean) {
        if (boolean === false) {
          filteredUrls.push(url);
        }
      })
    );
  });
  //return??
  archive.downloadUrls(filteredUrls);
};


//oh~~! prbz this file should be pure except
//cronTron

///////////////////////////
/////////CRON STUFF

//maybe this is 4 the cron stuff?? ? 
//every so often call downloadUrls

//                 //this should give us a filtered list
exports.job = new cron('10 * * * * *', function() {
  archive.downloadUrls(exports.filterUrlFiles());
  console.log('cron is doing its thing');
}, /* this next function is executed when the job stops*/ function() {
  console.log('done');
}, /* this starts the job right now*/ true, 
null
);