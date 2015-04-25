angular.module('sample.favorLogs', ['auth0'])
//controller
app.controller('favoriteCtrl', function ($scope, $http, $filter, $location, auth, ngDialog){
  //set get method for posts
  var Usr ={uid:auth.profile.user_id};
  $scope.method = 'POST';
  $scope.url = 'api/getFavorites.php';
  //execute method
  $http({method: $scope.method, url: $scope.url, data: Usr, headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}}).
    success(function(data, status) {
      $scope.status = status;
      $scope.favorites = data;
      console.log($scope.favorites);
    }).
    //state errer if couldn't make connection
    error(function(data, status) {
      $scope.posts = data || "Request failed";
      $scope.status = status;
  });

});
