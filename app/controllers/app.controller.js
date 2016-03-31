/*jshint expr:true*/
'use strict';
var mysql = require('mysql');
var config = require('../../config/config');
var mysqlDetails = require('./.env.json')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root', // should read from a config file
  database : 'mtn' // should read from a config file
});

connection.connect();
//error handling for controller method
var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

function getData(callback, options){
  connection.query('SELECT date, value FROM `aggregate` WHERE `categories` = ? AND `subscriber_type` = ?',
  [options.category, options.type],
    function (error, results) {
      if (error) callback(error);
      callback(null, results);
    });
}

exports.data = function(req, res){
  var category = config.categories[req.body.category];
  var type = config.types[req.body.type];
  var payload = {
    category: category,
    type: type
  }
  // console.log(payload);
  getData(function(error, results){
    if (error) res.send(error).status(500).end();
    res.json(results).status(200);
  }, payload);
}
