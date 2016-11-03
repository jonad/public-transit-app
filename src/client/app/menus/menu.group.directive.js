(function() {
  'use strict';

  angular.module('menus').directive('btMenuGroup', btMenuGroup);

  function btMenuGroup(){
    return {
      require: '^btMenu',
      transclude: true,
      scope: {
        label: '@',
        icon: '@'
      },
      templateUrl: 'app/menus/menu.group.template.html',
      link: function(scope, el, attrs, ctrl){
        scope.isOpen = false;
        scope.closeMenu = function() {
          scope.isOpen = false;
        };

        scope.clicked = function () {
          scope.isOpen = !scope.isOpen;
          if( el.parents('.bt-subtiem-section').length == 0)
            scope.setSubmenuPosition();

            ctrl.setOpenMenuScope(scope);
        };

        scope.isVertical = function(){
          return ctrl.isVertical();
        };

        scope.setSubmenuPosition = function() {
          var pos = el.offset();
          $('.bt-subitem-section').css({ 'left' : pos.left + 20, 'top': 36 });
        };

      }
    };
  }
})();
