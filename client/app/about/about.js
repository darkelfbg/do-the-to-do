'use strict';

angular.module('doTheToDoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/views/about.html',
        controller: 'AboutCtrl'
      });
  });