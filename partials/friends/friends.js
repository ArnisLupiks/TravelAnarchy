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
      var message = "<strong> "+auth.profile.given_name+"</strong> " + data;
      Flash.create('success', message, 'customAlert');
    })
  }
})
// ****** getting all Friends from database ***********
.factory('allFriends',function($http){
  return{
    getFriends : function(myDetails){
      return $http({
        url: 'api/getAllFriends.php',
        method: 'POST',
        data: myDetails
      })
    },
    getFriendsProfile : function(picUsrId){
      return $http({
        url: 'api/getPostUPic.php',
        method: 'POST',
        data: picUsrId
      })
    }
  }
})
.factory('friendProfile',function($http){
  return{
    individualFriendProfile : function(friendID){
      return $http({
        url: 'api/getProfile.php',
        method: 'POST',
        data: friendID
      })
    }
  }
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
.controller('allFriendsCtrl', function($scope, $location,friendProfile, allFriends, $rootScope, auth){
  $scope.buddys = [];
  //declaring member details
  var myDetails = {userID: auth.profile.user_id};
  //getting member friends
    allFriends.getFriends(myDetails).success(function(data){
      $scope.buddys = data;
      //getting for each member profile information
        angular.forEach($scope.buddys ,function(buddy){
          $scope.buddy = [];
          //setting variable wiwth member friend id
          var picUsrId = {uid : buddy.friendID };
            allFriends.getFriendsProfile(picUsrId).success(function(picdata){
              buddy.picture = picdata[0];
            })
        });
    });

 $scope.thisFriend = function(buddy){
   console.log("hey there. you just prewssed me" , buddy);
   $location.path('/friendProfile');
   var friendID = {uid: buddy.friendID};
   friendProfile.individualFriendProfile(friendID).success(function(data){
     $scope.bud = data;
     console.log("this is friends data: ", data[0].name)
   });
 };
})

.controller('friendProfileCtrl', function($scope, friendProfile, $rootScope, $rootScope, auth){

  console.log("this is this",$rootScope.selectedUsers);
});
