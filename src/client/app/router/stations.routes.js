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
        state : 'stations',
        config: {
          url: '/stations',
          template: '<wwa-stations></wwa-stations>',
          controller: 'stationsController'
        }
      }

    ]
  }

})();
