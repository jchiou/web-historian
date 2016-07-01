var archive = require('../helpers/archive-helpers.js');
var cron = require('cron').CronJob;
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.




// /////////////////////////////////
// //FILTER pre-downloaded files
// console.log('oooo', archive.readListOfUrls);
// console.log('still wonky', archive.readListOfUrls(console.log));
// exports.filterUrlFiles = function () {
//   var filteredUrls = [];
//   //for ea url in the exports.pathslist text
//   return archive.readListOfUrls(function (urlArray) {
//     urlArray.forEach(
//       function(url) { 
//         archive.isUrlArchived (url, function(boolean) {
//           if (boolean === false) {
//             // console.log('pushing');
//             filteredUrls.push(url);
//           }
//         });
//       });
//     console.log('about to return array of filtered urls');
//     return filteredUrls;
//     //
// //   });
//   //return??
// };


//oh~~! prbz this file should be pure except
//cronTron

///////////////////////////
/////////CRON STUFF

//maybe this is 4 the cron stuff?? ? 
//every so often call downloadUrls

//                 //this should give us a filtered list
exports.job = new cron('10 * * * * *', function () { archive.downloadUrls(); console.log('cron'); }, function() {
  fs.appendFile(__dirname + 'log.txt', 'poo');
}, /* this starts the job right now*/ true
);