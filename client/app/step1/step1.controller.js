'use strict';

angular.module('recuserstudyApp')
  .controller('Step1Ctrl', function ($scope, $http, Modal, $state, Movies) {

    /*    $http.get('/api/things').success(function(awesomeThings) {
     $scope.awesomeThings = awesomeThings;
     });*/

    var initial = true;

    var step1Html = '' +
    '<h3>Welcome to our user study experiment.</h3><br>' +
    '<p>The experiment will take an average time of 15 minutes, during this time we will introduce movies reccomendations from which you are required to pick the ones that best suites you.<br>In case none of the reccomendations appeals to you, you can choose to not make a choice and move forward.</br></p>' +
    '<br><p>In-order to show you the best reccomendations, we are going to begin with showing you a list of very known and successful movies from which you are asked to pick 10 that you most like.<br>You can always regret your pick of choice and replace it with another one.</br></p>';


    Modal.confirm.info()("Welcome!", step1Html, "I am ready. lets start");

    $scope.firstIndex = 0;
    $scope.lastIndex = 9;


    $scope.allMovies = Movies.all;

    $scope.totalMovies = Object.keys($scope.allMovies).length - 1;


    $scope.userMovies = Movies.user;
    $scope.movies = [];


    var alreadyFinished = false;
    $scope.$watch('userMovies.length', function(){
      if ($scope.userMovies.length === 1 && initial){
        initial = false;
        Modal.confirm.info()('Notice&nbsp&nbsp<span class="glyphicon glyphicon glyphicon-info-sign" aria-hidden="true"></span>', '<p>If you regret you choice you can always click the movie again to remove it.</p>', "Got it");

      }
      if ($scope.userMovies.length === 10 && !alreadyFinished){
        alreadyFinished = true
        Modal.confirm.confirm(function(){$state.go("step2", {"recId": 1})})("You have finished the first step", '<p>You can move forward or change your choices if you wish.</p>', "Continue");
      }
    });

    for (var i = 0; i < 10; i++) {
      $scope.movies.push($scope.allMovies[i]);
    }

    $scope.left = function () {
      if ($scope.firstIndex > 0) {
        $scope.movies.pop();
        $scope.lastIndex--;
        $scope.firstIndex--;
        $scope.movies.unshift($scope.allMovies[$scope.firstIndex]);
        return;
      }
    };

    $scope.right = function () {
      if ($scope.lastIndex < Object.keys($scope.allMovies).length - 1) {
        $scope.movies.shift();
        $scope.lastIndex++;
        $scope.firstIndex++;
        $scope.movies.push($scope.allMovies[$scope.lastIndex]);
        return;
      }
    };

    $scope.addMovie = function(index) {
      for (var i = 0; i < $scope.userMovies.length; i++){
        if ($scope.userMovies[i].name === $scope.movies[index].name){
          $scope.removeMovie(i);
          return;
        }
      }
      $scope.userMovies.push($scope.movies[index]);
    };

    $scope.removeMovie = function(index) {
      $scope.userMovies.splice(index, 1);
    };

    $scope.calcMovie = function (movie) {
      for (var i = 0; i < $scope.userMovies.length; i++){
        if ($scope.userMovies[i].name === movie.name){
          return 'thumbnail chosen';
        }
      }
      return 'thumbnail';
    }


  });
