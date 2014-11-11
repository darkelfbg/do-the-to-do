'use strict';

angular.module('doTheToDoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('doDoes', {
        url: '/doDoes',
        templateUrl: 'app/about/views/about.html',
        controller: 'AboutCtrl'
      });
  });