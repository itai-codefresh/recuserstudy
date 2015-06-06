'use strict';

angular.module('recuserstudyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('step2', {
        url: '/step2/:recId',
        templateUrl: 'app/step2/step2.html',
        controller: 'Step2Ctrl'
      });
  });
