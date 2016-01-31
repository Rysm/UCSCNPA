.controller('CameracCtrl', function($scope, $cordovaCamera, $ionicLoading, $local storage){
    $scope.data = { "ImageURI" : "Select Photo" };
        var options = {
        quality:50,
        sourceType: Camera.PictureSourceType.CAMERA
  };
      $scope.selectPicture = function() {
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };

          $cordovaCamera.getPicture(options).then(
          function(imageURI) {
            window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
              $scope.picData = fileEntry.nativeURL;
              $scope.ftLoad = true;
              var image = document.getElementById('myImage');
              image.src = fileEntry.nativeURL;
              });
            $ionicLoading.show({template: 'Getting Photo...', duration:500});
          },
          function(err){
            $ionicLoading.show({template: 'An error occurred...', duration:500});
          })
        };

      var params = {};
      params.value1 = "someparams";
          params.value2 = "otherparams";

      options.params = params;

      var ft = new FileTransfer();
      ft.upload(fileURL, encodeURI("http://www.yourdomain.com/upload.php"), viewUploadedPictures, function(error) {$ionicLoading.show({template: 'Errore di connessione...'});
      $ionicLoading.hide();}, options);
