(function(){
  'use strict';

  angular.module('stations').controller('stationsController', stationsController);

  stationsController.$inject = ['stations', '$scope'];

  function stationsController(stations, $scope){
    console.log("stations ", stations);
    $scope.stations = stations;
  }
})();
