(function () {
    'use strict';
    var module = angular.module('main', []);
    module.controller('ProductController', ProductController);
    function ProductController($scope, $http) {
        $scope.showPage = false;
        $scope.savingProduct = false;
        $scope.removingProduct = false;
        $scope.product = {}; 
        $scope.products = [];
        $scope.cart = [];
            
        /* add_product modal*/
      
        $scope.addNewProduct = function() {                        
            $scope.product = {                
                name: null,
                description: null,
                price: null,
                image: null             
            };
                   
            $("#add_product").modal('show');         
            console.log($scope.product);
        } 
        
        $scope.saveProductToDB = function() {
            function success(response) {
                var productFromDB = response.data;
                console.log(productFromDB);
                $scope.products.push(productFromDB);
                console.log($scope.products);
                alert("New product added");
            }
            function error(response) {
                console.log(response);
            }
            $http({
                url: "http://localhost:8080/api/product",
                dataType: "json",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: angular.toJson($scope.product)
            }).then(success, error);
        }

        function getProducts(callback) {
            function success(response) {
                callback(response.data);
                console.log(response);
            }
            function error(response) {
                console.log(response);
            }
            $http.get("http://localhost:8080/api/product").then(success, error);
        }  
        
           
        /* shopping_cart modal*/
        $scope.addProductToShoppingCart = function(product) {
            product.amount = 1;
            $scope.cart.push(product);
            $scope.total = 0;
            // $scope.shoppingCartProduct.forEach(function(shoppingCartProduct){
            //     $scope.total += shoppingCartProduct.quantity * shoppingCartProduct.price;
            // });
            $("#shopping_cart").modal('show');           
        }
        
        $scope.viewShoppingCart = function(product) {    
          
            $("#shopping_cart").modal('show');           
        }

        $scope.removeProductFromShoppingCart = function($index) {
            var shoppingCartProduct = $scope.cart[$index];                   
            function success(response) {
                setTimeout(function() {
                    console.log("success");
                        $scope.cart.splice($index, 1);                 
                        alert("Product from shopping cart deleted");
                        $scope.$apply();
                        console.log($scope.cart);
                });         
            }                          
            function error(response) {
                console.log(response);
                $scope.removingProductFromShoppingCart = false;
                $scope.$apply();
            }
            $http({
                url: "http://localhost:8080/api/product",
                dataType: "json",
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                data: angular.toJson([shoppingCartProduct._id])
            })
            .then(success, error);
        }         

         /* edit_product modal*/
        $scope.editProduct = function(product) {
            $scope.saveEditableProduct = product;
            $("#edit_product").modal('show');
            console.log(product);           
        }

        $scope.saveEditableProduct = function() {
            if ($scope.savingProduct === true) {
                return;
            }
            $scope.savingProduct = true;

            function success(response) {
                $scope.editableProduct = null;
                $scope.savingProduct = false;
                $("#edit_product").modal('hide');                
            }
            function error(response) {
                console.log(response);
                $scope.savingProduct = false;
                alert("There was an error while updating your Product: " + $scope.editableProduct.name);
                $(document).find('.alert').html('');
                $(document).find('.alert.alert-danger').html();{{ dangerMessage}}

                $scope.dangerMessage = '...';

                $scope.errors = {
                    danger: null,
                    warning: null
                };

                $scope.errors.danger = '...';

                // <div class="alert alert-danger">{{errors.danger}}</div>
            }
            $http({
                url: "http://localhost:8080/api/product/" + $scope.editableProduct._id,
                dataType: "json",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                data: angular.toJson($scope.editableProduct)
            }).then(success, error);

        }    
        // function updateExistingProductInDB(product) {
        //     function success(response) {
        //         // ...
        //     }
        //     function error(response) {
        //         console.log(response);
        //     }
        //     $http({
        //         url: "http://localhost:8080/api/product/" + product._id,
        //         dataType: "json",
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         data: JSON.stringify(product)
        //     }).then(success, error);
        // }
                 
        $scope.removeProduct = function($index) {
            var product = $scope.products[$index];
            // TODO find product obj by index            
            function success(response) {
                setTimeout(function() {
                    console.log("success");
                        $scope.products.splice($index, 1);                 
                        alert("Product deleted");
                        // TODO apimti su setTimeout ir ideti $scope.$apply(); nes vyksta asinchriniskai.
                        $scope.$apply();
                        console.log($scope.products);
                });         
            }                          
            function error(response) {
                console.log(response);
                $scope.removingProduct = false;
                $scope.$apply();
            }
            $http({
                url: "http://localhost:8080/api/product",
                dataType: "json",
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                data: angular.toJson([product._id])
            })
            .then(success, error);
        }         
     
        function activate() {
            getProducts(function (productsArr) {
                $scope.products = productsArr;

                setTimeout(function() {
                    $scope.showPage = true;
                    $scope.$apply();
                });
            });
        }
        activate();
    };

})();

