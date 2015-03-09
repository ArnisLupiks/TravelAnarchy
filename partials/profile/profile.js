angular.module('sample.profile', ['auth0'])

.controller('profileCtrl', function($scope, $http, auth, store){
  $scope.auth = auth;


  var profileID =  store.get('profile');

  console.log("This is profile ID: "+ profileID);

  getProfile(); //Load profile function

          function getProfile(){


                  $http.get("api/getProfile.php").success(function(data){
                          $scope.user_profile = data;
                  });
          }
});
