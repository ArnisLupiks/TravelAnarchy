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
             var formData = {
             uid: profile.user_id,
             name: profile.name,
             username: profile.given_name,
             surname: profile.family_name,
             email: profile.email,
             birthday: profile.birthday,
            picture: profile.picture
           };
           console.log("a here",formData);
           $scope.method = 'POST';
           $scope.url = 'api/addUser.php';
           //execute method
           $http({method: $scope.method, url: $scope.url, data: formData, headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}}).
             success(function(data, status) {
               //if added information, it will log OK and redirect.
               console.log("OK", data);
               //redirect to main post page
               $location.path("/");
           }).error(function(data, status) {
               $scope.status = status;
               console.log("oh, something whent wrong: " , data);
           });


    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }
});
