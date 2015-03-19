angular.module('sample.messages', ['auth0']);
//controller
app.controller('messageCtrl', function  ($scope, $http, $filter, auth){
  $scope.auth = auth;


var Usr = {
    uid: auth.profile.user_id
};

console.log("This user ID: ", Usr);
  //set get method for posts
  $scope.method = 'POST';
  $scope.url = 'api/getMessages.php';
  $scope.uid = auth.profile.user_id;
  //execute method
  $http({method: $scope.method, url: $scope.url, data: Usr, headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}}).
    success(function(data, status) {
      $scope.status = status;
      $scope.messages = data;
      console.log(data);
      console.log("EEEE :" , status);
      //add to each post user profile information
      angular.forEach($scope.messages ,function(message){
        //get user id
        var picUsrId = {uid : message.senderUid };
        //get user information
        $http.post("api/getPostUPic.php" , picUsrId)
          .success(function(picdata){
                //adds picture/name/surname to post object
                message.picture = picdata[0];
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
