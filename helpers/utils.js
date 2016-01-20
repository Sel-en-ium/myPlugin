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

  /**
   * Recursively merges two objects.
   *
   * @param {Object} obj1 - Starting object, may have properties in common overwritten.
   * @param {Object} obj2 - Object whose properties will be added to obj1.
   *
   * @returns {Object} obj1 with all of obj2 properties.
   */
  utils.merge = function (obj1, obj2) {
    var key;

    obj1 = obj1 || {};
    obj1 = JSON.parse(JSON.stringify(obj1));

    // Add obj2 properties
    for (key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        try {
          if (obj2[key].constructor === Object) {
            // Recursive call
            obj1[key] = utils.merge(obj1[key], obj2[key]);
          } else {
            obj1[key] = obj2[key];
          }
        } catch (e) {
          obj1[key] = obj2[key];
        }
      }
    }

    return obj1;
  };

  window.myPlugin = window.myPlugin || {};
  window.myPlugin.utils = utils;

}());