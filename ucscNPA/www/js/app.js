// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives','firebase'])

//angular.module('ionic-firebase-seed', ['ionic', 'firebase'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// our firebase url
.constant('FBURL', 'https://ucscnpa.firebaseio.com/')

//create a firebase url
//store events in it
.factory('Messages', function($firebaseArray, FBURL, $window) {
  var ref = new $window.Firebase(FBURL + '/messages');
  return $firebaseArray(ref);
})

.controller('AppCtrl', function($scope, Auth, Messages) {


  // ADD MESSAGES TO A SYNCHRONIZED ARRAY

  // Bind messages to the scope
  $scope.messages = Messages;

  // Add a message to a synchronized array using $add with $firebaseArray
  $scope.addEvent = function(name,desc,loc,phone,email) {
      Messages.$add({
        name: name,
        email: email,
        phone: phone,
        location: loc
      });
      message.text = "";
  };

})

.run(function($ionicPlatform, FBURL) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (FBURL === "https://DEFAULT.firebaseio.com/") {
      angular.element(document.getElementById('app-content')).html('<h1>Please configure your Firebase URL in www/js/app.js before running!</h1>');
    }
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

//google maperino pleaserino
angular.module('ionic.example', ['ionic'])

    .controller('MapCtrl', function($scope, $ionicLoading, $compile) {
      function initialize() {

        //By default begin in downtown Santa Cruz
        var myLatlng = new google.maps.LatLng(36.970231,-122.025061);

        //define properties of Maps
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        //Added custom flag marker!!
        var image = 'img/new_marker.png';

        var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>I am here!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        //create and define properties of a marker
        var marker = new google.maps.Marker({
           position: myLatlng,
           map: map,
           icon: image,
           title: 'Downtown Santa Cruz'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }

      google.maps.event.addDomListener(window, 'load', initialize);

      $scope.centerOnMe = function() {

        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {

          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();

          //Create a new marker
          //NOT SURE WHY IT'S NOT WORKING
          var currentLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

          var currentMarker = new google.maps.Marker({
             position: currentLatlng,
             map: map,
             icon: image,
             title: 'Current Location'
          });

        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });

      };

      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };

    });
