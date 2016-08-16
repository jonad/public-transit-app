(function(){
'use strict';

angular.module('psFramework')
            .directive('psFrameworkdir', psFrameworkdir);

    function psFrameworkdir(){
      return {
    transclude: false,
    scope: {

    },
    controller: 'psFrameworkController',
    templateUrl: '/src/client/app/psFramework/psFrameworkTemplate.html'
  };

   psFrameworkController.$inject = ['$scope'];

   function  psFrameworkController($scope){

    }

}
})();

