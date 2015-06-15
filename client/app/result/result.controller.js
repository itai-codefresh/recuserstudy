'use strict';

angular.module('recuserstudyApp')
  .controller('ResultCtrl', function ($scope, $http, Modal) {
    $scope.loading = true;
    $scope.withImages = [1, 1];
    $scope.withoutImages = [1, 1];
    $scope.totalRecommendations = [1, 1];
    $scope.withImagesUsers = [1,1,1,1,1,1,1];
    $scope.withoutImagesUsers = [1,1,1,1,1,1,1];
    $scope.totalUsers = [1,1,1,1,1,1,1];

    $http.get('/api/movies/getStats')
      .then(function (res) {
        res = res.data;
        $scope.stats = res;
        $scope.totalRecommendations = [res.users.chosen, res.users.amount - res.users.chosen];
        $scope.withImages = [res.withImages.chosen, res.withImages.amount - res.withImages.chosen];
        $scope.withoutImages = [res.withoutImages.chosen, res.withoutImages.amount - res.withoutImages.chosen];
        $scope.withImagesUsers = [res.withImages["15-25"], res.withImages["26-35"], res.withImages["36-45"], res.withImages["46-55"], res.withImages["56-65"], res.withImages["66-75"], res.withImages["76-85"]];
        $scope.withoutImagesUsers = [res.withoutImages["15-25"], res.withoutImages["26-35"], res.withoutImages["36-45"], res.withoutImages["46-55"], res.withoutImages["56-65"], res.withoutImages["66-75"], res.withoutImages["76-85"]];
        $scope.totalUsers = [res.users["15-25"], res.users["26-35"], res.users["36-45"], res.users["46-55"], res.users["56-65"], res.users["66-75"], res.users["76-85"]];
      })
      .then(function(){
        $http.get('api/movies/getUsers')
      })
      .then(function(res){
        $scope.users = res.data;
        $scope.loading = false;
      })
      .catch(function(err){
        Modal.confirm.info(function () {
          $scope.loading = false;
        })("Error", err, "Ok");
      });

    $scope.labels1 = ["chose a recommendation", "did not choose a recommendation"];
    $scope.labels2 = ["15-25", "26-35", "36-45", "46-55", "56-65", "66-75", "76-85"];
    $scope.colors = ['#FD1F5E','#1EF9A1'];

  });
