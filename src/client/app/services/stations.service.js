(function () {

  'use strict';

  angular.module('services').factory('stationsService', stationsService);

  stationsService.$inject = ['config', '$http', 'utils'];

  function stationsService(config, $http, utils){


     var service = {
      getStations : getStations

     };

     return service;

     function getStations(){
      var configuration = {
        cache : true
      };

         var params = {
           cmd : 'stns',
           key : config.key
         };
        var cmdType = config.urls.stations;
       var url = utils.buildUrl(params, cmdType);
      return $http.get(url, configuration)
                        .then(function(data){

                          console.log("data", data.data);
                          console.log("data", data.data);

                          return data.data.root.stations.station;

                        });
     }



}
}
)();
