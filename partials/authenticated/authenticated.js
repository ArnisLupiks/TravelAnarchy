angular.module('sample.auth', [
  'auth0'
])

.controller( 'NavCtrl', function HomeController( $scope, auth, $http, $location, store, $rootScope ) {

  $scope.auth = auth;

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $rootScope.isAuthenticated = false;
    $location.path('/login');
  };
});
