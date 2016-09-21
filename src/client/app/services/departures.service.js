(function() {

  'use strict';

  angular.module('services').factory('departuresService', departuresService);


  departuresService.$inject = ['$http', 'config', 'utils'];
  function departuresService($http, config, utils){

    var service = {
      getCurrentDepartures : getCurrentDepartures
    };

    return service;

    function getCurrentDepartures(station){

      var configuration = {
        cache : true
      };
      var params = {
        cmd : 'etd',
        orig : station.abbr
      };

      var cmdType = config.urls.estimates;
      var url = utils.buildUrl(params, cmdType);
      return $http.get(url, configuration)
        .then(function(data) {
          return data.data;
        });
    }

  }

})();
