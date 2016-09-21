(function() {
  'use strict';

  angular.module('app')
            .directive('wwaStations', wwaStations);

    function wwaStations(){

      var directive = {
        template: '<bt-stations></bt-stations>',
        link : function(scope){
          scope.title = 'Stations List'
        }
      };

      return directive;
    }
})();
