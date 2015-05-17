angular.module('sample.messages', ['auth0'])
//controller

.controller('messageCtrl', function  ($scope,mess, Flash, $http, $filter, auth){
  $scope.auth = auth;
  //declare user id
  var Usr = {
      uid: auth.profile.user_id
  };
  //set get method for posts
  $scope.method = 'POST';
  $scope.url = 'api/getMessages.php';
  //execute method
  $scope.refresh = function(){//show and refresh list of comments
  $http({method: $scope.method, url: $scope.url, data: Usr, headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}}).
    success(function(data, status) {
      $scope.status = status;
      $scope.messages = data;
      console.log("hehehehe: ", $scope.messages);
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
}
$scope.refresh();
  $scope.removeMessage = function(message){
    console.log("was clicked delete");
    var rmMess = {receiverUid: auth.profile.user_id, mesID : message.ID};
    mess.removeMessages(rmMess).success(function(data){
        var message = "<strong> "+auth.profile.name+"</strong> you have deleted message";
        Flash.create('danger', message, 'customAlert');
        $scope.refresh();

      });
  };
})
.factory('mess',function($http){
  return{
    removeMessages: function(rmMess){
      return $http({url: 'api/removeMessages.php', method: 'POST', data: rmMess})
    }
  }
});
