'use strict';

angular.module('recuserstudyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('result', {
        url: '/result',
        templateUrl: 'app/result/result.html',
        controller: 'ResultCtrl'
      });
  });
