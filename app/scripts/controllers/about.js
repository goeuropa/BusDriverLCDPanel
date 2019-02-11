'use strict';

/**
 * @ngdoc function
 * @name rasp2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rasp2App
 */
angular.module('rasp2App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
