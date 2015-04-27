angular.module('sample.favorLogs',['auth0'])
//controller
.controller('favoriteCtrl', function ($scope, $http, $filter, $location, auth, ngDialog){
  //set get method for posts
  var Usr ={uid:auth.profile.user_id};
  $scope.method = 'POST';
  $scope.url = 'api/getFavorites.php';
  //execute method
  $http({method: $scope.method, url: $scope.url, data: Usr})
    .success(function(data, status) {
      $scope.status = status;
      $scope.favorites = data;
      //for each favorite log id get all log details
        angular.forEach($scope.favorites, function(favorite){
          var postID = {postID:favorite.postID};
          $scope.method = 'POST';
          $scope.url = 'api/getFavoriteLogs.php';
            $http({method: $scope.method, url: $scope.url, data: postID})
              .success(function(logs, status){
                favorite.logs = logs[0];
                $scope.logs = logs;
                  angular.forEach($scope.logs, function(log){
                    var picUsrId = {uid: log.uid};
                    $scope.method = 'POST';
                    $scope.url = 'api/getPostUPic.php';
                    $http({method: $scope.method, url: $scope.url, data: picUsrId})
                      .success(function(picdata, status){
                            //adds picture/name/surname to post object
                            console.log(status);
                           //console.log(picdata);
                            log.picture = picdata[0];
                          //trow error if not successfully executed function
                      }).error(function(err){
                          "ERROR in getPostUPic", console.log(err)
                    });
                  })
              }).error(function(err){
                "ERROR in getPostUPic", console.log(err)
            });
        })
    }).error(function(data, status) {
      $scope.favorites = data || "Request failed";
      $scope.status = status;
  });
  // remove log from favoites
  $scope.removeFavorit = function(favorite){
    console.log("YOu have pressed me!!!!!!!");
    var rmFavor = {uid:auth.profile.user_id, postID:favorite.postID};
    console.log("This is variable from favorites: " + rmFavor);
    $scope.method = 'POST';
    $scope.url = 'api/removeFavorite.php';
    $http({method: $scope.method, url: $scope.url, data: rmFavor})
      .success(function(data,status){
        console.log(data);
      })
      .error(function(err){
        "ERROR in deleting Favorite Log", console.log(err)
      });
    /*
    var favoritData = {uid:auth.profile.user_id, postID:post.postID};
    $scope.method = 'POST';
    $scope.url = 'api/addToFavorit.php';
    $http({method: $scope.method, url: $scope.url, data: favoritData})
      .success(function(data, status){
            //adds picture/name/surname to post object
            console.log(status);
          console.log(data);
          //trow error if not successfully executed function
          }).error(function(err){
              "ERROR in getPostUPic", console.log(err)
          });
          */
  };



});
