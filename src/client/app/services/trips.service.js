(function() {

  'use strict';

  angular.module('services').factory('tripsService', tripsService);


  tripsService.$inject = ['$http', 'config', 'utils', 'exceptionCatcher'];
  function tripsService($http, config, utils, exceptionCatcher){

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

      function getTripSuccess(data){
        if (data.data.root.message.error) {
          getTripFailed(data);
        } else {
          return data.data;
        }
      }

      function getTripFailed(e){
        return exceptionCatcher.catcher('Failed to get Trip data')(e.data.root.message.error);

      }
    }


   }

})();
