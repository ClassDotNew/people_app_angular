(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope){

    $scope.people = [
      {
        name: "Mary",
        bio: "has a lamb",
        bioVisible: true
      },
      {
        name: "Nary",
        bio: "has a namb",
        bioVisible: true
      },
      {
        name: "Gary",
        bio: "has a gamb",
        bioVisible: true
      }
    ]

    //  check how many people in the array have biovisible to be true
    $scope.available = 0;
    for(var i = 0; i < $scope.people.length; i++){
      if ($scope.people[i].bioVisible === true) {
        $scope.available++;
      }
    }

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

    $scope.showBio = function(inputPerson){
      // return true if biovisible is true otherwise return false
      if (inputPerson.bioVisible === true) {
        return true;
      } else {
        return false;
      }
    }

    $scope.addPerson = function(inputName, inputBio) {
      // make a new object
      // add that object to the array people
      var objectThing = {
        name: inputName,
        bio: inputBio,
        bioVisible: true
      }

      $scope.people.push(objectThing);
      $scope.name = "";
      $scope.bio = "";
    }

    $scope.removeHuman = function(someIndex){
      $scope.people.splice(someIndex,1);
    }

  });

}());
