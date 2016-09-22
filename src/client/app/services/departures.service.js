(function() {

  'use strict';

  angular.module('services').factory('departuresService', departuresService);


  departuresService.$inject = ['$http', 'config', 'utils', 'exceptionCatcher'];
  function departuresService($http, config, utils, exceptionCatcher) {

    var service = {
      getCurrentDepartures: getCurrentDepartures
    };

    return service;

    function getCurrentDepartures(station) {

      var configuration = {
        cache: true
      };
      var params = {
        cmd: 'etd',
        orig: station.abbr
      };

      var cmdType = config.urls.estimates;
      var url = utils.buildUrl(params, cmdType);
      return $http.get(url, configuration)
        .then(getDeparturesSuccess)
        .catch(getDeparturesFailed);

      function getDeparturesSuccess(data) {

        if (data.data.root.message) {
          getDeparturesFailed(data);
        }
          return data.data;
        }

        function getDeparturesFailed(e) {
          return exceptionCatcher.catcher('Failed to get departure data')(e.data.root.message.error);
        }
      }

    }


})();
