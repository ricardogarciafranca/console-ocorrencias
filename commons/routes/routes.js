(function(){

  'use-strict'

  function routeConfig($routeProvider){

    $routeProvider.
    when('/ocurrence', {
      templateUrl: 'modules/ocurrences/view/ocurrence.html',
      controller: 'OcurrenceController'
    }).
    otherwise({
      redirectTo: '/404',
      templateUrl: 'commons/view/404.html',
    });

  }

  routeConfig.$inject = ['$routeProvider'];

  angular.module('app').config(routeConfig);

})();
