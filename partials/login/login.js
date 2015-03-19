angular.module( 'sample.login', [
  'auth0'
])
.controller( 'LoginCtrl', function HomeController( $scope, auth, $location, store, $http ) {
  $scope.login = function() {
    auth.signin({}, function(profile, token) {
      store.set('profile', profile);
      store.set('but', profile);
      store.set('token', token);
      $location.path("/");
      $scope.$root.isAuthenticated = true;
      //storing user in database
      getUsers();
      function getUsers() {
             var formData = {
             uid: profile.user_id,
             name: profile.name,
             username: profile.given_name,
             surname: profile.family_name,
             email: profile.email,
             birthday: profile.birthday,
            picture: profile.picture
           };
           console.log(formData);
           $http({
               url: "api/addUser.php",
               data: formData,
               method: 'POST',
               headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
           }).success(function(data){
               //if added information, it will log OK and redirect.
               console.log("OK", data);
               //redirect to main post page
               $location.path("/");
           }).error(function(err){"ERR", console.log(err)})
       };
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }
});
