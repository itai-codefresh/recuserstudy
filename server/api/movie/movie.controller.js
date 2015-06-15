/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Movie = require('./movie.model');

var lastTime = true;

exports.withImages = function (request, response) {
  var totalWithImages = 0;
  var totalWithoutImages = 0;
  Movie.find({withImages: true}, function (err, movies) {
    if (err) {
      return response.send(400, "An error occurred while trying to initialize the system. We are sorry.");
    }
    else {
      totalWithImages = movies.length;
      Movie.find({withImages: false}, function (err, movies) {
        if (err) {
          return response.send(400, "An error occurred while trying to initialize the system. We are sorry.");
        }
        else {
          totalWithoutImages = movies.length;
          var abs = Math.abs(totalWithImages - totalWithoutImages);
          if (abs > 10) {
            if (totalWithImages > totalWithoutImages)
              return response.send(false);
            else
              return response.send(true);
          }
          else {
            lastTime = !lastTime;
            return response.send(!lastTime);
          }
        }
      });
    }
  })
};

exports.getUsers = function (request, response){
  Movie.find(function(err, res){
    if (err){
      return response.send(400, "An error occurred while trying to bring data from system. We are sorry.");
    }
    else {
      var users = [];
      res.map(function(record){
        users.push({bgu: record.bgu, date: record.date});
      });
      return response.json(200, users);
    }
  });
};


exports.deleteAll = function(request, response){
  Movie.remove({}, function(err){
    if (err){
      return response.send(400, "An error occurred while trying to delete data from system. We are sorry.");
    }
    else {
      return response.json(200, "success");
    }
  })
};

exports.saveUserExperiment = function (request, response) {
  request.body.date = new Date();
  Movie.create(request.body, function (err) {
    if (err) {
      return response.send(400, "An error occurred while trying to save data the system. We are sorry.");
    }
    else {
      return response.json(200, request.body);
    }
  });
};

exports.getStats = function (request, response) {
  Movie.find(function (err, res) {
    if (err) {
      return response.send(400, "An error occurred while trying to bring data from system. We are sorry.");
    }
    else {
      var result = {
        users: {
          total: 0, "15-25": 0, "26-35": 0, "36-45": 0, "46-55": 0, "56-65": 0, "66-75": 0, "76-85": 0, amount: 0, chosen: 0
        }
        ,
        withImages: {
          total: 0, "15-25": 0, "26-35": 0, "36-45": 0, "46-55": 0, "56-65": 0, "66-75": 0, "76-85": 0, amount: 0, chosen: 0
        },
        withoutImages: {
          total: 0, "15-25": 0, "26-35": 0, "36-45": 0, "46-55": 0, "56-65": 0, "66-75": 0, "76-85": 0, amount: 0, chosen: 0
        }
      };
      res.map(function (record) {
        result.users.total++;
        result.users[record.age]++;
        if (record.withImages){
          result.withImages.total++;
          result.withImages[record.age]++;
        }
        else{
          result.withoutImages.total++;
          result.withoutImages[record.age]++;
        }

        record.res.map(function (user) {
          if (user.choice !== 'none') {
            result.users.amount++;
            result.users.chosen++;
            if (record.withImages) {
              result.withImages.amount++;
              result.withImages.chosen++;
            }
            else {
              result.withoutImages.amount++;
              result.withoutImages.chosen++;
            }
          }
          else {
            result.users.amount++;
            if (record.withImages)
              result.withImages.amount++;
            else
              result.withoutImages.amount++;
          }

        });
      });
      return response.json(200, result);
    }
  });
};
