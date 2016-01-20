/*jslint browser:true*/
(function () {
  'use strict';

  var
    storage = window.chrome.storage.sync;

  window.chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    window.console.log(sender);
    localStorage.setItem('thing', JSON.stringify(sender));

    switch (request.name) {

    case "getOptions":
      storage.get(function (options) {
        sendResponse(options);
      });
      break;

    default:
      break;

    }
    return true;  // Needed to keep the communication open for async responses
  });

}());