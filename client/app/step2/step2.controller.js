'use strict';

angular.module('recuserstudyApp')
  .controller('Step2Ctrl', function ($scope, $http, Modal, Movies, $state, $stateParams, $interval) {

    $scope.loading = true;

    $scope.withImages = Movies.withImages;

    $interval(function () {
      $scope.loading = false;
    }, 500, 1);

    $scope.id = $stateParams.recId;

    if ($scope.id < 1 || $scope.id > 10) {
      $state.go('step1');
      return;
    }

    if (!Movies.user.length) {
      $state.go("step1");
      return;
    }
    else {
      var userMovies = Movies.user;
    }


    var currentMovie = userMovies[$scope.id - 1];
    $scope.recommendations = [];

    currentMovie.recommend.map(function (id) {
      $scope.recommendations.push(Movies.all[id]);
    });

    var step1Html = '' +
      '<p>In this step we are going to show you 10 sets of recommendations made by our system.<br>In each step you are required to choose the movie that you will most like.<br>If none of the recommendations suits you please choose <b>"Nothing suits me</b>".</p>';

    var finishHtml = '' +
      '<p>Thanks for participating in the experiment.<br>We appreciate the time and effort you have made.</p>' +
      '<p>We will see you at the movies.</p>';


    if ($scope.id == 1) {
      Modal.confirm.info()("Info", step1Html, "Got it");
    }

    $scope.continue = function (rec) {

      if (rec) {
        userMovies[$scope.id - 1].choice = rec;
      }
      else {
        userMovies[$scope.id - 1].choice = null;
      }

      if ($scope.id == 10) {
        //TODO send data to server
        Modal.confirm.info(function () {
          window.location.assign("http://www.imdb.com")
        })("That's it. You Finished", finishHtml, "Finish");
      }
      else {
        $state.go("step2", {recId: parseInt($scope.id) + 1});
      }

    };

    $scope.calcProgress = function () {
      var x = ((parseInt($scope.id)) * 10).toString();
      return {width: x + '%'};
    }

  });
