'use strict';

angular.module('doTheToDoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/views/main.html',
        controller: 'MainCtrl'
      });
  });