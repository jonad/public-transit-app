(function() {

  'use strict';
  angular.module('app').directive('wwaDepartures', wwaDepartures);

  function wwaDepartures(){

    var directive = {

      template: '<bt-departures></bt-departures>',
      link: function (scope) {

        scope.title = 'Real Time Departures';

        }
    };

    return directive;
  }
})();
