(function () {
    'use strict';
    var module = angular.module('main', []);
    module.controller('PersonController', PersonController);
    function PersonController($scope, $http) {     
            $scope.persons = [];
            $scope.persons = [
                { id: 1,  'name': 'Petras', 'surname': 'Petraitis', 'age': 28},
                { id: 2, 'name': 'Jonas', 'surname': 'Jonaitis', 'age': 35},   
                { id: 3, 'name': 'Onutė', 'surname': 'Onaitė', 'age': 23},
                { id: 4, 'name': 'Giedrė', 'surname': 'Giedraitė', 'age': 32}
            ]; 
            selected: {};

            var person = {
                id:'',
                name:'',
                surname:'',
                age:''
            };
            $scope.editablePerson = null;

            $scope.$watch("selectedAll", function(newVal, oldValue){
                checkAll();
            });
        

        $scope.addPerson = function(){
            var maxID = (Math.max.apply(null, $scope.persons.map(x => x.id)) || 0) + 1;
            if(!!$scope.persons.find(x =>
            x.name === $scope.persons.name && 
            x.surname === $scope.persons.surname && 
            x.age === $scope.persons.age)) {
            //alert('already exists');
            $scope.errorMessage = true;
            return;
            }
            $scope.persons.push({ id: $scope.id, name: $scope.name, surname: $scope.surname, age:$scope.age });
            $scope.persons.id='';
            $scope.persons.name='';
            $scope.persons.surname='';
            $scope.persons.age='';
        }

        $scope.editPerson = function(person) {
            $scope.editablePerson = person;
            $("#edit_person").modal('show');

            console.log(person);
        }

        $scope.savePerson = function() {
            $scope.editablePerson = null;

            //ajax
        }                        
            $scope.removePerson = function(index) {
            $scope.selectedAll = false;
            angular.forEach($scope.persons, function(selected, index) {
                if (selected.selected) {
                    $scope.persons.slice(index, 1);
                }
            });
        }

        function checkAll() {
            angular.forEach($scope.persons, function(person, index) {
                person.selected = $scope.selectedAll;
            });
        }
                 
            $scope.table.push($scope.newPerson);
            console.log($scope.table);

            savePersonToDB($scope.newPerson);
            $scope.newPerson = {};
        

        function savePersonToDB(person) {
            function success(response) {
                // ...
            }
            function error(response) {
                console.log(response);
            }
            $http({
                url: "http://localhost:8080/api/person",
                dataType: "json",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(person)
            }).then(success, error);
        }

        function updateExsitingPersonInDB(person) {
            function success(response) {
                // ...
            }
            function error(response) {
                console.log(response);
            }
            $http({
                url: "http://localhost:8080/api/person/" + person._id,
                dataType: "json",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(person)
            }).then(success, error);
        }

        function getPersons(callback) {
            function success(response) {
                callback(response.data);
                console.log(response);
            }
            function error(response) {
                console.log(response);
            }
            $http.get("http://localhost:8080/api/person").then(success, error);
        }

        function activate() {
            getPersons(function (personsArr) {
                $scope.table = personsArr;

                setTimeout(function() {
                    $scope.showPage = true
                    $scope.$apply();
                });
            });
        }
        activate();
    };   
      
});


