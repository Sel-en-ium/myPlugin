/*jslint browser:true*/
(function () {
  'use strict';

  var
    storage = window.chrome.storage.sync,
    form = document.getElementById('options-form');

  // Reads the form and returns the options object
  function readForm() {
    var
      options = {};
    window.myPlugin.utils.forEach(form.elements, function (index, node) {
      /*jslint unparam:true*/
      if (node.name === 'injectOn' || node.name === 'isModule') {
        options[node.name] = node.checked;
      } else if (node.name !== 'save') {
        // Includes 'server'
        options[node.name] = node.value;
      }
    });
    return options;
  }

  // Saves options to chrome.storage
  function save_options() {
    var
      options = readForm();
    storage.set(options, function () {
      window.console.log('saved');
    });
  }

  function populateForm(options) {
    window.myPlugin.utils.forEach(options, function (optionName, optionVal) {
      try {
        var
          node = form.elements[optionName];
        if (optionName === 'injectOn' || optionName === 'isModule') {
          node.checked = optionVal;
        } else if (node.name !== 'save') {
          // Includes 'server'
          node.setAttribute('value', optionVal);
        }
      } catch (e) {
        window.console.error(e);
      }
    });
  }

  // Restores the option in the view
  function restore_options() {
    var
      defaultOptions = {
        injectOn: false,
        isModule: false,
        server: ''
      };
    storage.get(function (options) {
      options = window.myPlugin.utils.merge(defaultOptions, options);
      populateForm(options);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Don't let it refesh the page
    save_options(); // But feel free to save
  });

  form.elements.save.addEventListener('click', save_options);

  document.addEventListener('DOMContentLoaded', restore_options);
}());