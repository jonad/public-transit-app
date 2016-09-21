(function(){
  'use strict';

  angular.module('departures').controller('departuresController', departuresController);

  departuresController.$inject = ['stations', '$scope', 'departuresService'];

  function departuresController(stations, $scope, departuresService){
    console.log("stations ", stations);
    $scope.stations = stations;
    $scope.currentStation = { };
   $scope.currentDepartures = { };

   $scope.getCurrentDepartures =  function (){

     departuresService.getCurrentDepartures(JSON.parse($scope.currentStation))
       .then(function(data){
         $scope.currentStation = JSON.parse($scope.currentStation);
         console.log("current departures ", data.root.station.etd);
         $scope.currentDepartures = data.root.station.etd;
       });
   }

  }
})();
