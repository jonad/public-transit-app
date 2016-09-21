(function(){

  'use strict';

  angular.module('logger')
    .factory('logger', logger);

  logger.$inject = ['$log'];

  function logger($log){
    var service = {

      error: error,
      warning: warning,
      info: info,
      success: success,
      log: $log.log
    };

    return service;



    ///////////////////////////////////////////////////////////////////////////////////

    function error(message, data){
      $log.error('Error: ' + message, data);
    }

    function warning(message, data){
      $log.warn('Warning: ' + message, data);
    }

    function info(message, data){
      $log.info('Info: ' + message, data);
    }

    function success(message, data){
      $log.success('Success: ' + message, data);
    }
  }
})();
