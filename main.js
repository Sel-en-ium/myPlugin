/*jslint browser:true*/
(function () {
  'use strict';

  function inject(options) {
    var injectScript = document.createElement('script');
    injectScript.src = options.server;
    injectScript.async = true;
    if (options.isModule) {
      injectScript.type = 'module';
    }

    if (document.getElementsByTagName('body').length === 0) {
      document.getElementsByTagName('html')[0].appendChild(injectScript);
    } else {
      document.body.appendChild(injectScript);
    }
  }

  window.chrome.runtime.sendMessage({name: "getOptions"}, function (options) {
    if (options.injectOn) {
      inject(options);
    }
  });

}());