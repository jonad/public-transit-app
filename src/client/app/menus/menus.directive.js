(function() {
  'use strict';

  angular.module('menus')
              .directive('btMenu', btMenu);

      btMenu.$inject = ['$timeout']
      function btMenu($timeout){
        var directive =  {
          scope: {

          },
          transclude: true,
          templateUrl: 'app/menus/menu.template.html',
          controller: 'menusController',
          link: function(scope, el, attr){
              var item = el.find('.bt-selectable-item:first');
           $timeout(function() {
              item.trigger('click');
           });
          }
        };

        return directive;
      }
})();
