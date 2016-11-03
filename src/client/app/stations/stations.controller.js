(function(){
  'use strict';

  angular.module('stations').controller('stationsController', stationsController);

  stationsController.$inject = ['stations'];

  function stationsController(stations){
    var vm = this;
    console.log("stations ", stations);
    vm.stations = stations;
  }
})();
