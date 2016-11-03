(function(){

  'use strict';
  angular.module('app.layout').controller('layoutController', layoutController);

  layoutController.$inject = ['$scope', '$rootScope',  '$window', '$timeout', '$state'];

  function layoutController($scope, $rootScope,  $window, $timeout, $state){
      $scope.isMenuVisible = true;
      $scope.isMenuButtonVisible = true;
      $scope.isMenuVertical = true;

      // $scope.$on('bt-menu-item-selected-event', function(evt, data){
      //   $scope.routeString = data.route;
      //   $location.path(data.route);
      //   checkWidth();
      //   broadcastMenuState();
      // } );

    var checkWidth = function(){
      var width = Math.max($($window).innerWidth(), $window.innerWidth);
      $scope.isMenuVisible = (width > 768);
      $scope.isMenuButtonVisible = !$scope.isMenuVisible;
    };

    var broadcastMenuState = function() {
      $rootScope.$broadcast('bt-menu-show', {
        show : $scope.isMenuVisible,
        isVertical: $scope.isMenuVertical,
        allowHorizontalToggle: !$scope.isMenuButtonVisible
      });
    };


    $scope.$on('bt-menu-item-selected-event', function(evt, data){
      $scope.state = data.state;
      $state.go(data.state);
      checkWidth();
      broadcastMenuState();
    } );

      $scope.$on('bt-menu-orientation-changed-event', function(evt, data) {
        $scope.isMenuVertical = data.isMenuVertical;
      });

      $($window).on('resize.layout', function() {
        $scope.$apply(function() {
          checkWidth();
          broadcastMenuState();
        });
      });

      $scope.$on('$destroy', function(){
        $($window).off('resize.layout');
      });



      $scope.menuButtonClicked = function(){
        $scope.isMenuVisible = !$scope.isMenuVisible;
        broadcastMenuState();
        $scope.$apply();
      };


      $timeout(function() {
        checkWidth();
      }, 0);


  }
})();
