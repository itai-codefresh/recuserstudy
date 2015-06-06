'use strict';

angular.module('recuserstudyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('step1', {
        url: '/step1',
        templateUrl: 'app/step1/step1.html',
        controller: 'Step1Ctrl'
      });
  });
