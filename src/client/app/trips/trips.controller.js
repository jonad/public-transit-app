(function(){
  'use strict';

  angular.module('trips').controller('tripsController', tripsController);

  tripsController.$inject = ['stations', 'tripsService', 'logger'];

  function tripsController(stations, tripsService, logger){
    var vm = this;

    vm.stations = stations;
    console.log('in trips : ' , stations);
   vm.trip = {};
   //vm.schedules = {};

   vm.getSchedule = function() {
     // tripsService.getSchedule(vm.trip)
     //   .then(function(data){
        // vm.schedules = data;
         $state.go('trip_detail', {
           trip : vm.trip
         });
       //});
   };
  }

})();
