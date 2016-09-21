(function(){

  'use strict';

  angular.module('routes').provider('routerHelper', routerHelperProvider);

  routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider){

    // remove the hash on the url
   // $locationProvider.html5Mode(true);
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    this.$get = RouterHelper;
    var config = {
      docTitle: 'Bart App: ',
      resolveAlways: {
        stations : function(stationsService) {
          return stationsService.getStations();
        }
      }
    };



    // To do some configuration


    /////////////////////////////////////////////////////////

    RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger'];
    function RouterHelper($location, $rootScope, $state, logger){
      var handlingStateChangeError = false;
      var hasOtherwise = false;



      var service = {
        configureStates : configureStates,
        getStates : getStates
      };

      var stateCounts = {
        errors: 0,
        changes : 0
      };

      init();
      return service;

      ///////////////////////

      // configures states
      function configureStates(states, otherwisePath){
        states.forEach(function(state){
          state.config.resolve = angular.extend(state.config.resolve || {}, config.resolveAlways);
          $stateProvider.state(state.state, state.config);

        });
        if(otherwisePath && !hasOtherwise){
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      }


      // handling routing error
      function handleRoutingErrors(){
        // On routing error, go to the dashboard
        // on state not found : log the current state wasnt found
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
              if(handlingStateChangeError){
                return;
              }
              stateCounts.errors++;
              handlingStateChangeError = true;
              var destination = (toState && (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                  'unknown target';

          var msg = 'Error routing to ' + destination + '. ' +
            (error.data || '') + '. <br/>' + (error.statusText || '') +
            ': ' + (error.status || '');
          //logger.warning(msg, [toState]);
          $location.path('/');
        });

      }


      //update doc title on successful document load
      function updateDocTitle(){
        $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
          stateCounts.changes++;
          handlingStateChangeError = false;
          var title = config.docTitle + ' ' + (toState.title || '');
          $rootScope.title = title;
        });
      }

      function init(){
        handleRoutingErrors();
        updateDocTitle();
      }

      function getStates(){
        return $state.get();
      }



    }



  }



})();
