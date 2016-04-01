/*jshint expr:true*/
'use strict';
var mysql = require('mysql');
var _ = require('lodash');
var config = require('../../config/config.json');
var mysqlDetails = require('../../config/env.json');


var connection = mysql.createConnection(mysqlDetails);

connection.connect();

function getFromDb(callback, options){
  connection.query(options.sql,options.args,
    function (error, results) {
      if (error) callback(error);
      callback(null, results);
    });
}

exports.data = function(req, res){
  var category = config.categories[req.body.category];
  var type = config.types[req.body.type];
  getFromDb(function(error, results){
    if (error) res.send(error).status(500).end();
    res.json(results).status(200);
  },{
    sql:'SELECT date, value FROM `aggregate` WHERE `categories` = ? AND `subscriber_type` = ? ORDER BY date DESC',
    args: [category, type] // the args order matters
  });
};

exports.allData = function(req, res){
  var date = req.params.date;
  var dates = [];
  getFromDb(function(error, results){
    if (error) res.send(error).status(500).end();
    var datasets = [];
    // we want to split data by categories
    _.forEach(config.categories, function(code, name){
      var grouped = _.filter(results, function(obj) {
        return obj.categories === code;
      });
      if (grouped.length === null) return false;
      var tempDates = grouped.map(function(obj) {
        return { label: 'd-'+ new Date(obj.date).getDate()};
      });
      // there should be as many dates as the largest count of items in a category
      if (tempDates.length > dates) dates = tempDates;
      var tempData = {};
      tempData.seriesName = name;
      tempData.data = grouped.map(function(obj) {
        return { value: obj.value};
      });
      datasets.push(tempData);
    });
    res.json({datasets: datasets, dates: dates}).status(200);
  },{
    sql: 'SELECT date, value, categories FROM `aggregate` WHERE `date` > ? ORDER BY date DESC',
    args: [date]
  } );
};
