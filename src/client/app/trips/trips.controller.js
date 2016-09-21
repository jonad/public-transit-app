(function(){
  'use strict';

  angular.module('trips').controller('tripsController', tripsController);

  tripsController.$inject = ['stations', '$scope', 'tripsService', 'logger'];

  function tripsController(stations, $scope, tripsService, logger){

    $scope.stations = stations;
    console.log("in trips : " , stations);
   $scope.trip = {};
   $scope.schedules = {};

   $scope.getSchedule = function() {
      logger.error("inside schedule controller ", $scope.trip);
     tripsService.getSchedule($scope.trip)
       .then(function(data){
         $scope.schedules = data;
       });

   }
  }

})();
