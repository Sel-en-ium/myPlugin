/*jslint browser:true*/
(function () {
  'use strict';

  function inject(server) {
    var
      injectScript = document.createElement('script');
    injectScript.src = server;
    injectScript.async = true;

    if (document.getElementsByTagName('body').length === 0) {
      document.getElementsByTagName('html')[0].appendChild(injectScript);
    } else {
      document.body.appendChild(injectScript);
    }
  }

  window.chrome.runtime.sendMessage({name: "getOptions"}, function (options) {
    inject(options.server);
  });

}());