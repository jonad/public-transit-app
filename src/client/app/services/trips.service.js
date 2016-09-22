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
        .then(getTripSuccess)
        .catch(getTripFailed);

      function getTripSucess(data){
        if (data.data.root.message) {
          getDeparturesFailed(data);
        }
        return data.data;
      }

      function getTripFailed(e){
        return exceptionCatcher.catcher('Failed to get Trip data')(e.data.root.message.error);

      }
    }


   }

})();
