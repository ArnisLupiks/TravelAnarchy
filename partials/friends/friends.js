angular.module('sample.friends', ['auth0'])
//********* getting members from database ***********
.factory('members',function($http){
  return{
    get: function(callback){
      $http.get('api/getUserForMessage.php').
        success(callback)
    }
  };
})
//********* adding new friend to database ************
.factory('addFriend' ,function($http){
  var friends = [];
  return function(friendData, callback){
    $http.post('api/addFriend.php', friendData).
    success(function(data,status){
      console.log("OK- message sent", data);
    })
    console.log("this is addFriend", friendData);
  }
})
//********* Add friend controller *********************
.controller('friendsCtrl', function ($scope, members, addFriend, $rootScope, $http, $filter, $window, $location, auth){
  $scope.auth = auth;
    //getting receiver user details for messaging
      members.get(function(members){
        $scope.users = members;
     });


     //adding new friend
     $scope.addFriend = function(){
       var friendData = {userID: auth.profile.user_id, friendID: $rootScope.selectedUsers.uid};
       addFriend(friendData);
     };



      //setting receiver scope infromation
       $rootScope.selectedUsers = "";
         $scope.$watch('selectedUsers', function(newValue, oldValue) {
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
