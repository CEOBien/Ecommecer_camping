'use strict';

var utils = require('../utils/writer.js');
var System = require('../service/SystemService');

module.exports.login = function login (req, res, next, body) {
  System.login(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
