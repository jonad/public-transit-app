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
        state: 'trips',
        config: {
          url: '/trips',
          template: '<wwa-trips></wwa-trips>',
          controller: 'tripsController'
        }
      }

    ];
  }

})();
