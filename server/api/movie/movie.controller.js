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

exports.withImages = function(request, response) {
  var totalWithImages = 0;
  var totalWithoutImages = 0;
  Movie.find({withImages:true}, function(err, movies){
    if (err){
      return response.send(400, "An error occurred while trying to initialize the system. We are sorry.");
    }
    else {
      totalWithImages = movies.length;
      Movie.find({withImages:false}, function(err, movies){
        if (err){
          return response.send(400, "An error occurred while trying to initialize the system. We are sorry.");
        }
        else {
          totalWithoutImages = movies.length;
          if (totalWithImages > totalWithoutImages)
            return response.send(false);
          else
            return response.send(true);
        }
      });
    }
  })
};

exports.saveUserExperiment = function(request, response) {
  Movie.create(request.body, function(err){
    if (err){
      return response.send(400, "An error occurred while trying to save data the system. We are sorry.");
    }
    else {
      return response.send();
    }
  });
};

exports.getStats = function(request, response){
  Movie.find(function(err, res){
    if (err){
      return response.send(400, "An error occurred while trying to bring data from system. We are sorry.");
    }
    else {
      var x = res;
      return response.json(200, {total: 100, votedForSomething: 40, skipped: 60});
    }
  });
};
