(function() {

  'use strict';

  angular.module('app.layout').directive('appLayout', appLayout);

  function appLayout() {
    var directive = {
      transclude: true,
      scope: {
        title: '@',
        subtitle: '@',
        iconFile: '='
      },
      controller: 'layoutController',
      templateUrl: 'app/layout/layout.template.html'
    };

    return directive;
  }
})();
