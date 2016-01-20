/*jslint browser:true*/
(function () {
  'use strict';

  var
    storage = window.chrome.storage.sync,
    form = document.getElementById('options-form');

// Saves options to chrome.storage
  function save_options() {
    var
      options = {};

    window.myPlugin.utils.forEach(form.elements, function (index, element) {
      /*jslint unparam:true*/
      if (element.name !== 'save') {
        options[element.name] = element.value;
      }
    });

    storage.set(options, function () {
      window.console.log('saved');
    });
  }

// Restores the option in the view
  function restore_options() {
    storage.get(function (options) {
      window.myPlugin.utils.forEach(options, function (optionName, optionVal) {
        form.elements[optionName].setAttribute('value', optionVal);
      });
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Don't let it refesh the page
    save_options(); // But feel free to save
  });

  form.elements.save.addEventListener('click', save_options);

  document.addEventListener('DOMContentLoaded', restore_options);
}());