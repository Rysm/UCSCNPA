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
