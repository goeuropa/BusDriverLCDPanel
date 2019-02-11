'use strict';

/**
 * @ngdoc function
 * @name rasp2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * @author Grzegorz Patynek
 */
angular.module('rasp2App')
  .controller('MainCtrl', function ($scope, $http, $q, SettingsService) {

/* consts */
      $scope.agencyid = SettingsService.agencyid;
      $scope.nrboczny = SettingsService.nrboczny;
      $scope.line_id = $scope.agencyid + "_" + $scope.nrboczny;
      $scope.epsilon = SettingsService.epsilon;//6 sekund tolerancji
      $scope.postoj = SettingsService.postoj;//6 sekund tolerancji
      $scope.apiUrl = SettingsService.apiUrl;
/* end consts */


      $scope.nrlinii = "_";
      $scope.nastprzystanek = "_";
      $scope.przysp = "_";
      $scope.kierunek = "_"
      $scope.najblprzystanek = "_";
      $scope.najblprzystanekoffset = "_";

      $scope.isConnectionAndVehicle = false;
      $scope.delay = 1;

      var current_data = {};

      $scope.odswiez = function(){
      var prom = [];
          prom.push($http.get($scope.apiUrl+"vehicles-for-agency/"+$scope.agencyid+".json?key=web"));
      $q.all(prom).then(function(resultsarr){

          for ( var i = 0 ; i < resultsarr[0].data.data.list.length ; i++ ){
              if ( $scope.hasVehicle(resultsarr[0].data.data.list[i]) ){
                $scope.getDataVehiclesForAgency(resultsarr[0].data.data.list[i]);
              }else {
                $scope.isConnectionAndVehicle = false;
              }

          }
      for ( var i = 0 ; i < resultsarr[0].data.data.references.stops.length ; i++ ){
          if ( $scope.hasNextStop(resultsarr[0].data.data.references.stops[i],current_data.next_stop_id) ){
            $scope.getDataReferencesNextStopForAgency(resultsarr[0].data.data.references.stops[i]);
            $scope.isConnectionAndVehicle = true;
          }
        }
        for ( var i = 0 ; i < resultsarr[0].data.data.references.stops.length ; i++ ){
          if ( $scope.hasClosestStop(resultsarr[0].data.data.references.stops[i],current_data.closest_stop_id) ){
            $scope.getDataReferencesClosestStopForAgency(resultsarr[0].data.data.references.stops[i]);
          }
      };

      var prom2 = [];
      prom2.push($http.get($scope.apiUrl+"trip/"+current_data.trip_id+".json?key=web"));
      $q.all(prom2).then(function(results){
        current_data.direction = results[0].data.data.entry.tripHeadsign;
        current_data.line_number = results[0].data.data.entry.routeId;
        $scope.update_current_data(current_data);

      });

    });
    };
    setInterval(function(){
      $scope.odswiez();
}, 3000);

  $scope.hasVehicle = function(results){
    if ( results.vehicleId == $scope.line_id )
      {
        return true;
      }
    else{
      return false;
    }
  };
  $scope.extractLine = function(line){
    var length = $scope.agencyid.toString().length;
    return line.toString().substring(length+1,line.toString().length);
  }
  $scope.update_current_data = function(current_data){
    $scope.nrlinii = $scope.extractLine(current_data.line_number);
    $scope.kierunek = current_data.direction;
    $scope.nastprzystanek = current_data.next_stop_name;
    $scope.updateDelay(current_data.next_stop_offset);
    $scope.przysp = current_data.next_stop_offset;
    $scope.najblprzystanek = current_data.closest_stop_name;
    $scope.najblprzystanekoffset = current_data.closest_stop_offset;
    $scope.updateDelayClosest(current_data.closest_stop_offset);

  }
  $scope.onTime = function(time){
    if ( ( parseInt(time) > -1*parseInt($scope.epsilon)  ) && ( parseInt(time) < parseInt($scope.epsilon)  ) )
      return true;
    else
      return false;
  };
  $scope.onTimeClosest = function(time){
    if ( ( parseInt(time) > -1*parseInt($scope.postoj)  ) && ( parseInt(time) < parseInt($scope.postoj)  ) )
      return true;
    else
      return false;
  };
  $scope.tooEarly = function(time){
    if ( parseInt(time) < 0  )
      return true;
    else
      return false;
  }
  $scope.tooLate = function(time){
    if ( parseInt(time) > 0  )
      return true;
    else
      return false;
  }
  $scope.updateDelay = function(delay_s){
    if ( $scope.onTime(delay_s) == true )
      {
        $scope.delay = 'ok';
      }
    else if ( $scope.tooLate(delay_s) == true )
      {
          $scope.delay = 'late';
      }
    else if ( $scope.tooEarly(delay_s) == true )
      {
          $scope.delay = 'early';
      }
  }
  $scope.updateDelayClosest = function(delay_s){
    if ( $scope.onTimeClosest(delay_s) == true )
      {
        $scope.delayClosest = 'ok';
      }
    else if ( $scope.tooLate(delay_s) == true )
      {
          $scope.delayClosest = 'late';
      }
    else if ( $scope.tooEarly(delay_s) == true )
      {
          $scope.delayClosest = 'early';
      }
  }
  $scope.getDataVehiclesForAgency = function(data){
    current_data.next_stop_id = data.tripStatus.nextStop;
    current_data.closest_stop_id = data.tripStatus.closestStop;
    current_data.trip_id = data.tripId;
    current_data.next_stop_offset = data.tripStatus.scheduleDeviation;
    current_data.closest_stop_offset = data.tripStatus.closestStopTimeOffset;
  };
  $scope.hasNextStop = function(data,stopId){
    if ( data.id == stopId )
      {
        return true;
      }
    else {
      return false;
    }
  }
  $scope.hasClosestStop = function(data,stopId){
    if ( data.id == stopId )
      {
        return true;
      }
    else {
      return false;
    }
  }
  $scope.getDataReferencesNextStopForAgency = function(data){
    current_data.next_stop_name = data.name;

  }
  $scope.getDataReferencesClosestStopForAgency = function(data){
    current_data.closest_stop_name = data.name;

  }
  });
