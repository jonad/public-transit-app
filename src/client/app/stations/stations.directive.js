(function() {
  'use strict';

  angular.module('stations')
    .directive('btStations', btStations);

  function btStations(){

    var directive = {
      templateUrl: 'app/stations/stations.template.html',
      link: function(scope, element, attrs){

      }
    };

    return directive;
  }
})();
