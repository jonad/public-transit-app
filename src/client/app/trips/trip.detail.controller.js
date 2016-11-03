(function() {
  'use strict';

  angular.module('trips').factory('tripDetail', tripDetail);

  tripDetail.$inject = [];
  function tripDetail(){

    var vm = this;
    vm.schedules = {};
    activate();

    function activate(){
      return tripsService.getSchedule(vm.trip)
        .then(function(data) {
          vm.schedules = data;
          console.log(vm.schedules);
        });
    }

  }
})();
