'use strict';

/**
 * @ngdoc function
 * @name rasp2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * @author Grzegorz Patynek
 */
angular.module('rasp2App')
  .service('SettingsService', function ($http, $q) {

    this.agencyid = 20;
    this.nrboczny = 5070;
    this.line_id = this.agencyid + "_" + this.nrboczny;
    this.epsilon = 3;
    this.postoj = 20;
    this.apiUrl = "https://beta.kiedybus.pl/onebusaway-webapp-production/api/where/";

    this.setNrBoczny = function(nr_boczny){
      this.nrboczny = nr_boczny;
      this.line_id = this.agencyid + "_" + this.nrboczny;
    }
});
