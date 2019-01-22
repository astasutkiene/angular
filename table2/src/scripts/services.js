(function () {
    
'use strict';

angular.module('main')
    .factory('Main', ['$http', function($http){
        var baseUrl = "http://localhost:8080";
        // function changeUsershow(user) {
        //     angular.extend(currentUser, user);
        // }
        // return {
        //     admin: function(data, success, error) {
        //         $http.posts(baseUrl + '/admin.html', data).success(success).error(error)            
        //     },
        //     customer: function(data, success, error) {
        //         $http.post(baseUrl + '/customer', data).success(success).error(error)
        //     },
            // me: function(success, error) {
            //     $http.get(baseUrl + '/me').success(success).error(error)
            // },
            // logout: function(success) {
            //     changeUser({});
            //     // delete $localStorage.token;
            //     localStorage.removeItem('token');
            //     success();
            // }
        // };        
    }
]);

})();