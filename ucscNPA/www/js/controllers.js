angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {

})

.controller('🔍SearchCtrl', function($scope) {

})

.controller('🎪RequestEventCtrl', function($scope) {

})

.controller('createEventCtrl', function($scope, Auth, Messages) {


})

.controller('editOrgCtrl', function($scope) {

})

.controller('createOrgCtrl', function($scope) {

})

.controller('profileCtrl', function($scope) {

})

angular.module('App').controller('loginController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  var ref = new Firebase(FURL);
  var userkey = "";
  $scope.signIn = function (user) {
    console.log("Enviado");
    if(angular.isDefined(user)){
    Utils.show();
    Auth.login(user)
      .then(function(authData) {
      //console.log("id del usuario:" + JSON.stringify(authData));

      ref.child('profile').orderByChild("id").equalTo(authData.uid).on("child_added", function(snapshot) {
        console.log(snapshot.key());
        userkey = snapshot.key();
        var obj = $firebaseObject(ref.child('profile').child(userkey));

        obj.$loaded()
          .then(function(data) {
            //console.log(data === obj); // true
            //console.log(obj.email);
            $localStorage.email = obj.email;
            $localStorage.userkey = userkey;

              Utils.hide();
              $state.go('home');
              console.log("Starter page","Home");

          })
          .catch(function(error) {
            console.error("Error:", error);
          });
      });

      }, function(err) {
        Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

});


angular.module('App').controller('registerController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {

  $scope.register = function(user) {
    if(angular.isDefined(user)){
    Utils.show();
    Auth.register(user)
      .then(function() {
         Utils.hide();
         console.log("Antes de loguear:" + JSON.stringify(user));
         Utils.alertshow("Successfully","The User was Successfully Created.");
         $location.path('/');
      }, function(err) {
         Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

}
);


.controller('forgotPasswordCtrl', function($scope) {

})

.controller('mapsCtrl', function($scope) {

})
