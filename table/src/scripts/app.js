(function () {
'use strict';

angular.module('main', ['ngRoute'])
.config (['$routeProvider', function ($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl : "index.htm",
        controller: 'ItemController'
    })
    .when("/admin", {
        templateUrl : "partials/admin.htm",
        controller: 'ItemController'
    })
    .when("/customer", {
        templateUrl : "partials/customer.htm",
        controller: 'ItemController'
    })    
    .otherwise({
            redirectTo: '/'
    });    
    
}]);
})();
   