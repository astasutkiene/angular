/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\n  'use strict';\n\n  var module = angular.module('main', []);\n  module.controller('ProductController', ProductController);\n\n  function ProductController($scope, $http) {\n    $scope.showPage = false;\n    $scope.savingProduct = false;\n    $scope.removingProduct = false;\n    $scope.product = {};\n    $scope.products = [];\n    $scope.cart = [];\n    /* add_product modal*/\n\n    $scope.addNewProduct = function () {\n      $scope.product = {\n        name: null,\n        description: null,\n        price: null,\n        image: null\n      };\n      $(\"#add_product\").modal('show');\n      console.log($scope.product);\n    };\n\n    $scope.saveProductToDB = function () {\n      function success(response) {\n        var productFromDB = response.data;\n        console.log(productFromDB);\n        $scope.products.push(productFromDB);\n        console.log($scope.products);\n        alert(\"New product added\");\n      }\n\n      function error(response) {\n        console.log(response);\n      }\n\n      $http({\n        url: \"http://localhost:8080/api/product\",\n        dataType: \"json\",\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        data: angular.toJson($scope.product)\n      }).then(success, error);\n    };\n\n    function getProducts(callback) {\n      function success(response) {\n        callback(response.data);\n        console.log(response);\n      }\n\n      function error(response) {\n        console.log(response);\n      }\n\n      $http.get(\"http://localhost:8080/api/product\").then(success, error);\n    }\n    /* shopping_cart modal*/\n\n\n    $scope.addProductToShoppingCart = function (product) {\n      product.amount = 1;\n      $scope.cart.push(product);\n      $scope.total = 0; // $scope.shoppingCartProduct.forEach(function(shoppingCartProduct){\n      //     $scope.total += shoppingCartProduct.quantity * shoppingCartProduct.price;\n      // });\n\n      $(\"#shopping_cart\").modal('show');\n    };\n\n    $scope.viewShoppingCart = function (product) {\n      $(\"#shopping_cart\").modal('show');\n    };\n\n    $scope.removeProductFromShoppingCart = function ($index) {\n      var shoppingCartProduct = $scope.cart[$index];\n\n      function success(response) {\n        setTimeout(function () {\n          console.log(\"success\");\n          $scope.cart.splice($index, 1);\n          alert(\"Product from shopping cart deleted\");\n          $scope.$apply();\n          console.log($scope.cart);\n        });\n      }\n\n      function error(response) {\n        console.log(response);\n        $scope.removingProductFromShoppingCart = false;\n        $scope.$apply();\n      }\n\n      $http({\n        url: \"http://localhost:8080/api/product\",\n        dataType: \"json\",\n        method: \"DELETE\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        data: angular.toJson([shoppingCartProduct._id])\n      }).then(success, error);\n    };\n    /* edit_product modal*/\n\n\n    $scope.editProduct = function (product) {\n      $scope.saveEditableProduct = product;\n      $(\"#edit_product\").modal('show');\n      console.log(product);\n    };\n\n    $scope.saveEditableProduct = function () {\n      if ($scope.savingProduct === true) {\n        return;\n      }\n\n      $scope.savingProduct = true;\n\n      function success(response) {\n        $scope.editableProduct = null;\n        $scope.savingProduct = false;\n        $(\"#edit_product\").modal('hide');\n      }\n\n      function error(response) {\n        console.log(response);\n        $scope.savingProduct = false;\n        alert(\"There was an error while updating your Product: \" + $scope.editableProduct.name);\n        $(document).find('.alert').html('');\n        $(document).find('.alert.alert-danger').html();\n        {\n          {\n            dangerMessage;\n          }\n        }\n        $scope.dangerMessage = '...';\n        $scope.errors = {\n          danger: null,\n          warning: null\n        };\n        $scope.errors.danger = '...'; // <div class=\"alert alert-danger\">{{errors.danger}}</div>\n      }\n\n      $http({\n        url: \"http://localhost:8080/api/product/\" + $scope.editableProduct._id,\n        dataType: \"json\",\n        method: \"PUT\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        data: angular.toJson($scope.editableProduct)\n      }).then(success, error);\n    }; // function updateExistingProductInDB(product) {\n    //     function success(response) {\n    //         // ...\n    //     }\n    //     function error(response) {\n    //         console.log(response);\n    //     }\n    //     $http({\n    //         url: \"http://localhost:8080/api/product/\" + product._id,\n    //         dataType: \"json\",\n    //         method: \"PUT\",\n    //         headers: {\n    //             \"Content-Type\": \"application/json\",\n    //         },\n    //         data: JSON.stringify(product)\n    //     }).then(success, error);\n    // }\n\n\n    $scope.removeProduct = function ($index) {\n      var product = $scope.products[$index]; // TODO find product obj by index            \n\n      function success(response) {\n        setTimeout(function () {\n          console.log(\"success\");\n          $scope.products.splice($index, 1);\n          alert(\"Product deleted\"); // TODO apimti su setTimeout ir ideti $scope.$apply(); nes vyksta asinchriniskai.\n\n          $scope.$apply();\n          console.log($scope.products);\n        });\n      }\n\n      function error(response) {\n        console.log(response);\n        $scope.removingProduct = false;\n        $scope.$apply();\n      }\n\n      $http({\n        url: \"http://localhost:8080/api/product\",\n        dataType: \"json\",\n        method: \"DELETE\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        data: angular.toJson([product._id])\n      }).then(success, error);\n    };\n\n    function activate() {\n      getProducts(function (productsArr) {\n        $scope.products = productsArr;\n        setTimeout(function () {\n          $scope.showPage = true;\n          $scope.$apply();\n        });\n      });\n    }\n\n    activate();\n  }\n\n  ;\n})();\n\n//# sourceURL=webpack:///./src/scripts/app.js?");

/***/ })

/******/ });