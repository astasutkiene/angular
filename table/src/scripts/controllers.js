(function () {
'use strict';

/* Controllers */

angular.module('main')    
    // module.controller('ItemController', ItemController);    
    // function ItemController($scope, $http) {
    .controller('ItemController', ['$rootScope','$scope', '$http', 'Main', 
    function ( $rootScope, $scope, $http, Main) {
        $scope.showPage = false;
        $scope.item = {}; 
        $scope.items = [];       
        $scope.reservation = [];

        /* table_reservation modal*/      
        $scope.createNewReservation = function() {                        
            $scope.item = {                
                name: null,
                email: null,
                phone: null,                
                table_number: null,
                person_quantity: null,
                datetime: null                           
            };               
            $("#table_map").modal('show');          
            console.log($scope.item);           
        }
        $http.get("admin.htm").then(function (response) {
            $scope.showAllReservations() = response.data;
        });

        // $scope.showAllReservations = function(){          
            // $("#reservation_for_employees");            
        // }
        
        // $scope.admin = function() {
        //     Main.admin(function(res) {
        //         $scope.Items = res;
        //     }, function() {
        //         $rootScope.error = 'Failed to fetch details';
        //     })
        // };

        $scope.saveItemToDB = function() {
            if ($scope.savingItem) {
                return;
            }
            $scope.savingItem = true;
            /*validation prevent duplicate*/
            function success(response) {
                console.log(response);
                if (response.data.type === 'success') {
                    $scope.items.push(response.data);
                    alert("Rezervacija sėkmingai sukurta");                
                } else if (response.data.type === 'error') {
                    $scope.item.errors = {};
                    angular.forEach(response.data.errors, function (errorItem, key) {
                        $scope.item.errors[errorItem.prop] = errorItem.error;
                    });
                }
                $scope.savingItem = false;
            }  
            function error(response) {
                console.log(response);
        
                $scope.savingItem = false;
            }
            $http({
                url: "http://localhost:8080/api/item",
                dataType: "json",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: angular.toJson($scope.item)
            }).then(success, error);
        }



        /* validation */
        function success(response) {
            console.log(response);
            if (response.data.name === 'success') {
                $scope.item.push($scope.item);
                $scope.item = {};
                alert('Rezervacija sėkmingai sukurta');

            } else 
            // The most important part
            if (response.data.name === 'errors') {
                item.errors = {};
                for (let i = 0; i < response.data.errors.length; i++) {
                    let errorItem = response.data.errors[i];
                    console.log(errorItem);
                    item.errors[errorItem.prop] = errorItem.error;
                }
                console.log(item.errors);
            }
        }
        /* end of validation*/



        /*validation prevent duplicate*/
        function success(response) {
            console.log(response);
            if (response.data.type === 'success') {
                $scope.items.push(response.data);                           
                callback();
            } else if (response.data.type === 'error') {
                alert(response.data.msg);
            }
        }  
            function error(response) {
                console.log(response);
            }
            $http({
                url: "http://localhost:8080/api/item",
                dataType: "json",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: angular.toJson($scope.item)
            }).then(success, error);
        
        /* save reservation and send 2 emails messages to administrator and customer*/
        $scope.saveItemToDB = function() {
            function success(response) {
                $http({
                    method: 'POST',
                    url: '',
                    data: $scope.item,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                console.log(response);
                

            }
            
        /*validation prevent duplicate*/
        function success(response) {
            console.log(response);
            if (response.data.type === 'success') {
                $scope.items.push(response.data);
                alert('Rezervacija sėkminga');                 
                callback();
            } else if (response.data.type === 'error') {
                alert(response.data.msg);
            }
        }  
            function error(response) {
                console.log(response);
            }
            $http({
                url: "http://localhost:8080/api/item",
                dataType: "json",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: angular.toJson($scope.item)
            }).then(success, error);
        }
        
        function getItems(callback) {
            function success(response) {
                callback(response.data);
                console.log(response);
            }
            function error(response) {
                console.log(response);
            }
            $http.get("http://localhost:8080/api/item").then(success, error);
        }

        function activate() {
            getItems(function (itemsArr) {
                $scope.items = itemsArr;

                setTimeout(function() {
                    $scope.showPage = true;
                    $scope.$apply();
                });
            });
        }
        activate();
    }]);
})();        


