(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope, $http){

    $scope.setup = function(){
      $http.get("/api/v1/people").then(function(response){
        $scope.people = response.data;
      });
    }
    //  check how many people in the array have biovisible to be true
    // $scope.available = 0;
    // for(var i = 0; i < $scope.people.length; i++){
    //   if ($scope.people[i].bioVisible === true) {
    //     $scope.available++;
    //   }
    // }

    $scope.toggleBio = function(person) {
      // if their bioVisible is true, make it false, and vice versa
      person.bioVisible = !person.bioVisible;
      $scope.available = 0;
      for(var i = 0; i < $scope.people.length; i++){
        if ($scope.people[i].bioVisible === true) {
          $scope.available++;
        }
      }

    }

    $scope.getOrderedAttribute = function(inputAttribute){
      if (inputAttribute === $scope.inputAttributeOrder) {
        $scope.reverse = !$scope.reverse;
        if (inputAttribute === 'name') {
          if ($scope.reverse) {
            $scope.nameSorter = 'v';
          } else {
            $scope.nameSorter = '^';
          }
        } else {
            if ($scope.reverse) {
              $scope.bioSorter = 'v';
            } else {
              $scope.bioSorter = '^';
            }
            $scope.nameSorter = '';
        }

      } else {
        $scope.reverse = false;
      }
      //  otherwise sort it alphabetically
      $scope.inputAttributeOrder = inputAttribute;
    }

    $scope.showBio = function(inputPerson){
      // return true if biovisible is true otherwise return false
      if (inputPerson.bioVisible === true) {
        return true;
      } else {
        return false;
      }
    }

    $scope.addPerson = function(inputName, inputBio) {
      var objectThing = {
        name: inputName,
        bio: inputBio
      }
      // add them to the db
      $http.post('/api/v1/people', objectThing).then(function(response){
        var newItem = response.data
        $scope.people.push(response.data);
        $scope.name = "";
        $scope.bio = "";
      }, function(responseError){
        $scope.errors = responseError.data.errors
      })

    }

    $scope.removeHuman = function(somePerson){
      console.log(somePerson);
      var someIndex = $scope.people.indexOf(somePerson);
      console.log(someIndex);
      $scope.people.splice(someIndex,1);
    }

    // end of controller
  });

// /end of app
}());
