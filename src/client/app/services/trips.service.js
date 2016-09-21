(function() {

  'use strict';

  angular.module('services').factory('tripsService', tripsService);


  tripsService.$inject = ['$http', 'config', 'utils'];
  function tripsService($http, config, utils){

    var service = {
      getSchedule : getSchedule
    };

    return service;


    function getSchedule(trip){
      var configuration = {
        cache : true
      };
      var params = {};
      params.orig = trip.orig;
      params.cmd = trip.cmd;
      params.dest = trip.dest;

      var cmdType = config.urls.schedules;
      var url = utils.buildUrl(params, cmdType);
      return $http.get(url, configuration)
        .then(function(data){

          return data.data;
        });
    }


   }

})();
