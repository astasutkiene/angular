(function () {
'use strict';

/* Controllers */

angular.module('main')    
    .controller('MenuController', ['$rootScope','$scope', '$http', 'Main', 
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
        
        $scope.multiply= function(event){
           $("#table_map").modal('hide');        
           $scope.item.table_number = event.target.id;
           if (event.target.id = 2 || 3 || 4 || 5) {
               $scope.item.person_quantity===2;
           } else {
               return "Svečių skaičius per didelis";
           }   
            console.log( $scope.item.table_number)         
        }
        $scope.onsubmit = function(){
            alert("Klaida");
          }    
        
       
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
        // function success(response) {
        //     console.log(response);
        //     if (response.data.type === 'success') {
        //         $scope.items.push(response.data);                           
        //         callback();
        //     } else if (response.data.type === 'error') {
        //         alert(response.data.msg);
        //     }
        // }  
        //     function error(response) {
        //         console.log(response);
        //     }
        //     $http({
        //         url: "http://localhost:8080/api/item",
        //         dataType: "json",
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         data: angular.toJson($scope.item)
        //     }).then(success, error);
        
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
                // callback();
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
    }])

    
    .controller('MainPageController', ['$rootScope', '$scope', '$http', 'Main',
    function ($rootScope, $scope, $http, Main) {
        // TODO ...
    }])
   
    .controller('AdminController', ['$rootScope', '$scope', '$http', 'Main',
    function ($rootScope, $scope, $http, Main) {
        // sort by table_number and datetime
        $scope.sortType     = 'item.table_number'; 
        $scope.sortReverse  = true;
        
        $scope.sortType     = 'item.datetime'; 
        $scope.sortReverse  = false; 

        // $scope.sortBy = function(keyName){
        //     $scope.sortReverse = !$scope.sortReverse;
        //     $scope.sortType = keyName;
        
        //     var reqParams = {
        //         sortBy: keyName,
        //         sortReverse: $scope.sortReverse
        //     };        
        //     $http.get('http://api/item', reqParams).then(function(response){
        //         $scope.claimList = response.data;  
        //     });
        // };
         // end of sort by table_number and datetime

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

         /* edit_item modal*/
         $scope.editItem = function(item) {
            $scope.editableItem = item;
            $("#edit_item").modal('show');
            console.log(item);           
        }

        $scope.saveItem = function() {
            if ($scope.savingItem === true) {
                return;
            }
            $scope.savingItem = true;

            function success(response) {
                $scope.editableItem = null;
                $scope.savingItem = false;
                $("#edit_item").modal('hide');                
            }
            function error(response) {
                console.log(response);
                $scope.savingItem = false;
                alert("There was an error while updating your item: " + $scope.editableItem.name);
                $(document).find('.alert').html('');
                $(document).find('.alert.alert-danger').html($scope.dangerMessage);

                $scope.dangerMessage = '...';

                $scope.errors = {
                    danger: null,
                    warning: null
                };
                $scope.errors.danger = '...';              
            }
            $http({
                url: "http://localhost:8080/api/item/" + $scope.editableItem._id,
                dataType: "json",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                data: angular.toJson($scope.editableItem)
            }).then(success, error);

        }    
        
        $scope.removeItem = function($index) {
            var item = $scope.items[$index];                  
            function success(response) {
                setTimeout(function() {
                    console.log("success");
                        $scope.items.splice($index, 1);                 
                        alert("Rezervacija panaikinta");                       
                        $scope.$apply();
                        console.log($scope.item);
                });         
            }                          
            function error(response) {
                console.log(response);
                $scope.removingItem = false;
                $scope.$apply();
            }
            $http({
                url: "http://localhost:8080/api/item",
                dataType: "json",
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                data: angular.toJson([item._id])
            })
            .then(success, error);
        }
       
    }])
    
    .controller('CustomerController', ['$rootScope', '$scope', '$http', 'Main',
    function ($rootScope, $scope, $http, Main) {       
            $scope.onsubmit = function(){
              alert("form submitted");
            }
          
        
    }]);
})();
        


