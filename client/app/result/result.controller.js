'use strict';

angular.module('recuserstudyApp')
  .controller('ResultCtrl', function ($scope, $http, Modal) {
    $scope.loading = true;
    $scope.withImages = [1, 1];
    $scope.withoutImages = [1, 1];

    $http.get('/api/movies/getStats')
      .success(function (res) {
        $scope.stats = res;
        $scope.withImages = [res.withImages.chosen, res.withImages.amount - res.withImages.chosen];
        $scope.withoutImages = [res.withoutImages.chosen, res.withoutImages.amount - res.withoutImages.chosen];
        $scope.loading = false;
      })
      .error(function(err){
        Modal.confirm.info(function () {
          $scope.loading = false;
        })("Error", err, "Ok");
      });

    $scope.labels = ["chose a recommendation", "did not choose a recommendation"];
    $scope.colors = ['#FD1F5E','#1EF9A1'];

  });
