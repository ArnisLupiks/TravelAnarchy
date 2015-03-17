angular.module('sample.newMessage', ['auth0'])

.controller('newMessageCtrl', function HomeController ($scope, $http, $filter, $location, auth){

  $scope.method = 'GET';
  $scope.url = 'api/getUserForMessage.php';
  //execute method
  $http({method: $scope.method, url: $scope.url})

  .success(function(data, status){
        $scope.status = status;
        $scope.users = data;
        console.log($scope.users);
        angular.forEach($scope.users ,function(user){
          //get user id
          var picUsrId = {uid : user.uid };
          //get user information
          $http.post("api/getUPic.php" , picUsrId)
            .success(function(picdata){
                  //adds picture/name/surname to post object
                  user.picture = picdata[0];
                //trow error if not successfully executed function
                }).error(function(err){
                    "ERROR in getPostUPic", console.log(err)
                });
        })
       }).
       //state errer if couldn't make connection
       error(function(data, status) {
         $scope.posts = data || "Request failed";
         $scope.status = status;
     });

});
