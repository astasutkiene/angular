(function () {
'use strict';

angular.module('main', ['ngRoute'])
.config (['$routeProvider', function ($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl : 'src/partials/main.html',
        controller: 'MainPageController'
    })
    .when('/admin', {
        templateUrl : 'src/partials/admin.html',
        controller: 'AdminController'
    })
    .when('/customer', {
        templateUrl : 'src/partials/customer.html',
        controller: 'CustomerController'
    })
    .when('/about', {
        templateUrl : 'src/partials/about.html',
        controller: 'AboutController'
    })
    .when('/menu', {
        templateUrl : 'src/partials/menu.html',
        controller: 'MenuController'
    })
    .when('/work', {
        templateUrl : 'src/partials/work.html',
        controller: 'WorkController'
    }) 
    .when('/team', {
        templateUrl : 'src/partials/team.html',
        controller: 'TeamController'
    })      
    .otherwise({
            redirectTo: '/'
    });    
    
}]);
})();
   