(function () {

  'use strict';

  angular.module('services').factory('stationsService', stationsService);

  stationsService.$inject = ['config', '$http', 'utils', 'exceptionCatcher'];

  function stationsService(config, $http, utils, exceptionCatcher){


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
                  .then(stationListSucess)
                  .catch(stationListFailed);

       function stationListSucess(data){
         if (data.data.root.message) {
           stationListFailed(data);
         }
         return data.data.root.stations.station;

       }

       function stationListFailed(e){
         return exceptionCatcher.catcher('Failed to get stations Data')(e.data.root.message.error);
       }
     }

}
}
)();
