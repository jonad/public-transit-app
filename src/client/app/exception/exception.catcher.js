(function() {
  'use strict';

  angular.module('exception')
    .factory('exceptionCatcher', exceptionCatcher);

  exceptionCatcher.$inject = ['$q', 'logger'];
  function exceptionCatcher($q, logger) {
    var service = {
      catcher: catcher
    };

    return service;


    // application level errors
    function catcher(message) {
      return function (e) {
        var newMessage = message + ': ' + e;
        logger.error(newMessage, e);
        return $q.reject(newMessage);
      };
    }
  }
})();
