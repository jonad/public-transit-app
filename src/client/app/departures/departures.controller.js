(function(){
  'use strict';

  angular.module('departures').controller('departuresController', departuresController);

  departuresController.$inject = ['stations', 'departuresService'];

  function departuresController(stations, departuresService){
    var vm = this;

    vm.stations = stations;
    vm.currentStation = { };
   vm.currentDepartures = { };

   vm.getCurrentDepartures =  function (){

     departuresService.getCurrentDepartures(JSON.parse(vm.currentStation))
       .then(function(data){
         vm.currentStation = JSON.parse(vm.currentStation);
        vm.currentDepartures = data.root.station.etd;
       });
   }

  }
})();
