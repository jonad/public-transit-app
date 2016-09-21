(function() {

  'use strict';

  angular.module('app')
              .directive('wwaTrips', wwaTrips);

    function wwaTrips(){

      var directive = {
        template: '<bt-trips></bt-trips>',
        link : function(scope){
          scope.title = 'Plan a trip';
        }
      };

      return directive;
    }

})();
