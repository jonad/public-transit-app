(function(){

  'use strict';

  angular.module('utils').factory('utils', utils);

  utils.$inject = ['config'];

  function utils(config){

    var service = {
      buildUrl : buildUrl
    };

    return service;

    function buildUrl(params, cmdType ){
      params.key = config.key;
      var encParams = encodeParams(params);
      var url = config.urls.root.concat(cmdType, encParams);
      return url;
    }


    function encodeParams(params){

      return Object.keys(params).map(
        function(key){
          return [key, params[key]].map(encodeURIComponent).join('=');
        }).join('&');

    }

  }
})();
