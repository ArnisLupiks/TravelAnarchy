angular.module('sample.friends', ['auth0'])

.controller('friendsCtrl', function ($scope, $rootScope, $http, $filter, $window, $location, auth){
  $scope.auth = auth;
  //getting receiver user details for messaging
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
      //setting receiver scope infromation
       $rootScope.selectedUsers = "";
         $scope.$watch('selectedUsers', function(newValue, oldValue) {
           console.log('newMessageCtrl.watch.list:', newValue);
           if(newValue !== oldValue){
             $rootScope.selectedUsers = newValue;
           }
         });
         //SELECTS MESSAGE FROM USER
         $rootScope.mess = "";
           $scope.$watch('mess', function(newValue, oldValue) {
             console.log('newMessageCtrl.watch.list:', newValue);
             if(newValue !== oldValue){
               $rootScope.mess = newValue;
             }
           });
         //posting message to user
         $scope.sendMessage = function() {
           //declare message payload
           var messy = {
             receiverUid: $rootScope.selectedUsers.uid,
             senderUid: auth.profile.user_id,
             message: $rootScope.mess
           };
           //declare method/url
           $scope.method = 'POST';
           $scope.url = 'api/sendMessage.php';
           //execute http
           $http({method: $scope.method, url:$scope.url, data: messy, headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}})
           .success(function(data,status){
             console.log("OK- message sent", data);
             $location.path("/message");
           })
           .error(function(data, status){
             $scope.message = data || " Sending failed";
             $scope.status = status;
           });
       };
});
