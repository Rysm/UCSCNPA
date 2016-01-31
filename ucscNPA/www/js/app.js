// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives','firebase'])

// our firebase url
.constant('FBURL', 'https://ucscnpa.firebaseio.com/')

.factory('Auth', function($firebaseAuth, FBURL, $window) {
  var ref = new $window.Firebase(FBURL);
  return $firebaseAuth(ref);
})

.factory('Events', function($firebaseArray, FBURL, $window) {
  var ref = new $window.Firebase(FBURL + '/events');
  return $firebaseArray(ref);
})

// Add events to the home feed
.controller('AppCtrl', function($scope, Auth, Events) {
  // Bind events to the scope
  $scope.events = Events;

  // Add a message to a synchronized array using $add with $firebaseArray
  $scope.addEvent = function(event) {
      Events.$add({
        text: event.text
      });
      event.text = "";
  };

})
