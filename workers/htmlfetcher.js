var archive = require('archive-helpers');
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.



/////////////////////////////////
////FILTER pre-downloaded files

exports.filterUrlFiles = function (urlList) {
  var filteredUrls = [];
  //for ea url in the exports.pathslist text
  archive.readListOfUrls ( urlList.forEach(url, function () {
    //check to see if exports.isUrlArchived
    archive.isUrlArchived (url, function(boolean) {
      if (boolean === false) {
        filteredUrls.push(url);
      } else {
        //write the file?
      }
    });
  }));
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
// archive.downloadUrls(archive.readListOfUrls(exports.filterUrlFiles));