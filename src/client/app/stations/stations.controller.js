(function(){
  'use strict';

  angular.module('stations').controller('stationsController', stationsController);

  stationsController.$inject = ['stations'];

  function stationsController(stations){
    var vm = this;
    console.log("stations ", stations);
    vm.stations = stations;
    vm.len = vm.stations.length;
    vm.group = new Array();
    var step = 0;
    while(step < vm.len){
      var elt = [stations[step].name, stations[step + 1].name, stations[step + 2].name, stations[step + 3].name, stations[step + 4].name];
      vm.group.push(elt);
      step+= 5
    }
  }

})();
