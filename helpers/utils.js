/*jslint browser:true*/
(function () {
  'use strict';
  var
    utils = {};

  /**
   * Iterates through an array or params of an object
   *
   * @param {object} obj - The object or array you wish to iterate through
   * @param callback(index, array[index]) - called for each iteration
   */
  utils.forEach = function (obj, callback) {
    var
      key;

    key = Object.prototype.toString.call(obj);
    if (key === '[object Array]' || key === '[object HTMLFormControlsCollection]') {
      for (key = 0; key < obj.length; key += 1) {
        callback(key, obj[key]);
      }
    } else if (key === '[object Object]') {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          callback(key, obj[key]);
        }
      }
    }
  };

  window.myPlugin = window.myPlugin || {};
  window.myPlugin.utils = utils;

}());