angular.module( 'sample.login', ['auth0'])

.factory('LogIn',function($http){
  return{
    addUser : function(formData){
      return $http({url: 'api/addUser.php', method: 'POST', data: formData})
    }
  }
})
.controller( 'LoginCtrl', function HomeController( $scope, auth, LogIn, $location, store, $http ) {
  $scope.login = function() {
    auth.signin({}, function(profile, token) {
      //stores information in localhost
      store.set('profile', profile);
      store.set('token', token);
      $location.path("/");
      $scope.$root.isAuthenticated = true;
      //storing user in database
      var formData = {uid: profile.user_id, name: profile.name, username: profile.given_name,surname: profile.family_name,
        email: profile.email, birthday: profile.birthday, picture: profile.picture};
        /* ****** Add user details to database ********** */
      LogIn.addUser(formData).success(function(data){
        console.log("OK", data);
        //redirect to main post page
        $location.path("/");
      })// end add details to databse
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }
});
