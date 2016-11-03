(function() {
  'use strict';

  angular.module('departures')
              .directive('btDepartures', btDepartures);

        function btDepartures(){

          var directive = {
            templateUrl: 'app/departures/departures.template.html',
            link: function(scope, element, attrs){

          }
        };

          return directive;
        }
})();
