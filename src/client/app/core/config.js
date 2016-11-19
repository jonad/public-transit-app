(function (){

  'use strict';

  var core = angular.module('core');

  var config = {
     appErrorPrefix: '[Public Transit Error] ',
     appTitle: 'Public Transit App',
     key :  'lol',
     urls : {
       root :  'http://api.bart.gov/api/',
       advisories : 'bsa.aspx?',
       estimates : 'etd.aspx?',
       routes :  'route.aspx?',
       schedules : 'sched.aspx?',
       stations : 'stn.aspx?'
     }
   };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$httpProvider'];
  function configure($httpProvider){
    $httpProvider.interceptors.push('xmlHttpInterceptor');
  }
})();
