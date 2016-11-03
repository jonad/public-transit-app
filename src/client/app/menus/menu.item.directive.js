(function(){
  'use strict';

  angular.module('menus').directive('btMenuItem', btMenuItem);

  function btMenuItem(){

    var directive = {
          require: '^btMenu',
          scope: {
            label: '@',
            icon: '@',
            state: '@'
          },
          templateUrl: 'app/menus/menu.item.template.html',
          link: function(scope, el, attr, ctrl){

            scope.isActive = function() {
              return el === ctrl.getActiveElement();
            }

            scope.isVertical = function(){
              return ctrl.isVertical() || el.parents('.bt-subitem-section').length > 0;
            }

            el.on('click', function(evt){
              evt.stopPropagation();
              evt.preventDefault();
              scope.$apply(function() {
                ctrl.setActiveElement(el);
                ctrl.setState(scope.state);
                //ctrl.setRoute(scope.route);
              });
            });

          }
    };

    return directive;
  }

})();
