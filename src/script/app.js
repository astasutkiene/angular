(function () {
    'use strict';
    var module = angular.module('main', []);
    module.controller('PersonController', PersonController);
    function PersonController($scope, $http) {
        $scope.showPage = false;
        $scope.savingPerson = false;
        $scope.removingPersons = false;
        $scope.persons = [];
        // $scope.persons = [
        //     { id: 1,  'name': 'Petras', 'surname': 'Petraitis', 'age': 28},
        //     { id: 2, 'name': 'Jonas', 'surname': 'Jonaitis', 'age': 35},
        //     { id: 3, 'name': 'Onutė', 'surname': 'Onaitė', 'age': 23},
        //     { id: 4, 'name': 'Giedrė', 'surname': 'Giedraitė', 'age': 32}
        // ];
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
            // Validation
            // Prevent same person
            if (!!$scope.persons.find(x =>
                x.name === $scope.persons.name &&
                x.surname === $scope.persons.surname &&
                x.age === $scope.persons.age)) {
                $scope.errorMessage = true;
                return;
            }
            var person = {
                name: $scope.name,
                surname: $scope.surname,
                age:$scope.age
            };
            savePersonToDB(person, function(personFromDB) {
                $scope.persons.push(personFromDB);

                console.log($scope.persons);
            });
        }

        $scope.editPerson = function(person) {
            $scope.editablePerson = person;
            $("#edit_person").modal('show');

            console.log(person);
        }

        $scope.savePerson = function() {
            $scope.savingPerson = true;
            function success(response) {
                $scope.editablePerson = null;
                $scope.savingPerson = false;
                $("#edit_person").modal('hide');
            }
            function error(response) {
                console.log(response);
                $scope.savingPerson = false;
            }
            $http({
                url: "http://localhost:8080/api/person/" + $scope.editablePerson._id,
                dataType: "json",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                data: angular.toJson($scope.editablePerson)
            }).then(success, error);



            //ajax
        }
        $scope.removePerson = function() {
            $scope.removingPersons = true;
            var selectedPersonsIds = [];
            angular.forEach($scope.persons, function(person, index) {
                if (person.selected) {
                    selectedPersonsIds.push(person._id);
                }
            });

            $scope.savingPerson = true;
            function success(response) {


                setTimeout(function() {
                    console.log("success");
                    $scope.selectedAll = false;
                    angular.forEach(selectedPersonsIds, function(removedId) {
                        angular.forEach($scope.persons, function(person, index) {
                            if (person._id === removedId) {
                                $scope.persons.splice(index, 1);
                            }
                        });
                    });
                    $scope.removingPersons = false;
                    $scope.$apply();

                    console.log($scope.persons);
                });
            }
            function error(response) {
                console.log(response);
                $scope.removingPersons = false;
            }
            $http({
                url: "http://localhost:8080/api/person",
                dataType: "json",
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                data: angular.toJson(selectedPersonsIds)
            }).then(success, error);
        }

        function checkAll() {
            angular.forEach($scope.persons, function(person, index) {
                person.selected = $scope.selectedAll;
            });
        }

        // function unknown() {
        //     $scope.table.push($scope.newPerson);
        //     console.log($scope.table);
        //
        //     savePersonToDB($scope.newPerson);
        //     $scope.newPerson = {};
        // }


        function savePersonToDB(person, callback) {
            function success(response) {
                callback(response.data);
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
                data: angular.toJson(person)
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
                $scope.persons = personsArr;

                setTimeout(function() {
                    $scope.showPage = true;
                    $scope.$apply();
                });
            });
        }
        activate();
    };

})();

