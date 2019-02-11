'use strict';

/**
 * @ngdoc function
 * @name rasp2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * @author Grzegorz Patynek
 */
angular.module('rasp2App')
  .controller('SettingsCtrl', function ($scope, $http, $q, SettingsService) {

$scope.nrboczny = SettingsService.nrboczny;
$scope.tolerancja = SettingsService.epsilon;
$scope.postoj = SettingsService.postoj;

$scope.updateData = function(){
  SettingsService.setNrBoczny($scope.nrboczny);
  SettingsService.epsilon = $scope.tolerancja;
  SettingsService.postoj = $scope.postoj;
}

  });
