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
.factory('addFriend' ,function($http, Flash, auth){
  return function(friendData, callback){
    $http.post('api/addFriend.php', friendData).
    success(function(data,status){
      var message = "<strong> "+auth.profile.given_name+"</strong> " + data + " !!!";
      Flash.create('success', message, 'customAlert');
    })
  }
})
// ****** getting all Friends from database ***********
.factory('allFriends',function($http){
  return function(myDetails, data){
      $http.post('api/getAllFriends.php', myDetails).
      success(function(data){
        console.log("This is Friends data", data);
      })
  };
})
//********* Add friend controller *********************
.controller('friendsCtrl', function ($scope, members, addFriend, $rootScope, $http, $filter, $window, $location, auth){
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
})
.controller('allFriendsCtrl', function($scope, allFriends, $rootScope, auth){
    $scope.init = function(){
      var myDetails = {userID: auth.profile.user_id};
      allFriends(myDetails);

    $scope.buddys = $rootScope.friends;
  }
});
