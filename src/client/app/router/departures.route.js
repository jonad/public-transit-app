(function() {
  'use strict';

  angular.module('routes').run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper){
    routerHelper.configureStates(getStates());

  }

  function getStates(){
    return [
      {
        state: 'departures',
        config: {
          url: '/',
          template: '<wwa-departures></wwa-departures>',
          controller: 'departuresController'

        }
      }
    ]
  }

})();
