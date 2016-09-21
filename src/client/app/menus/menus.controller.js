(function() {

  'use strict';

  angular.module('menus')
              .controller('menusController', menusController);

      menusController.$inject = ['$scope', '$rootScope'];

      function menusController($scope, $rootScope){
        $scope.showMenu = true;
        $scope.isVertical = true;
        $scope.showMenu = true;
        $scope.allowHorizontalToggle = true;
        this.setActiveElement = function(el){
          $scope.activeElement = el;
        };

        // this.setRoute = function(route){
        //   $rootScope.$broadcast('bt-menu-item-selected-event',
        //           { route: route });
        // };

        this.setState = function(state){
          $rootScope.$broadcast('bt-menu-item-selected-event', {
            state: state
          });
        };

        this.isVertical = function(){
          return $scope.isVertical;
        }

        this.getActiveElement = function(){
          return $scope.activeElement;
        };

        $scope.$on('bt-menu-show', function(evt, data) {
          $scope.showMenu = data.show;
          $scope.isVertical = data.isVertical;
          $scope.allowHorizontalToggle = data.allowHorizontalToggle;
        });

        this.setOpenMenuScope = function(scope) {
          $scope.openMenuScope = scope;
        }


        $scope.toggleMenuOrientation = function(){
          // close any open menu
          if($scope.openMenuScope)
            $scope.openMenuScope.closeMenu();

          $scope.isVertical = !$scope.isVertical;

          $rootScope.$broadcast('bt-menu-orientation-changed-event',
            { isMenuVertical: $scope.isVertical }
            );
          };

          angular.element(document).bind('click', function(e){
            if($scope.openMenuScope && !$scope.isVertical) {
              if($(e.target).parent().hasClass('bt-selectable-item'))
                return ;
              $scope.$apply(function(){
                $scope.openMenuScope.closeMenu();
              });
              e.preventDefault();
              e.stopPropagation();
            }
          });
        }
      })();
