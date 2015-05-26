angular.module('sample.profile', ['auth0', 'angular-storage'])

.controller('profileCtrl', function HomeController ($scope, auth, $location, store, $http ){
  $scope.auth = auth;
              //get logged user id
              var profil =  store.get("profile");
              var thisUser = { uid: profil.user_id};
              //console.log(thisUser);

                $http.post(
                     "api/getProfile.php",
                     thisUser,
                {
                   headers : {'Content-Type':'application/json'}
                }).success(function(data){
                    //if added information, it will log OK and redirect.
                //    console.log("OK", data);
                    $scope.user_profile = data[0];

                }).error(function(err){"ERR", console.log(err)});

});
