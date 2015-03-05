angular.module('sample.auth', [
  'ui.router'
])
.config(function($stateProvider) {
  $stateProvider
    .state('auth', {
      abstract: true,
      controller: 'AuthCtrl',
      templateUrl: 'partials/authenticated/authenticated.html',
      data: {
        requiresLogin: true
      }
    });

})
.controller('AuthCtrl', function($scope, auth, $state, store) {
  $scope.auth = auth;

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    $state.go('login');
  };

  var profile = store.get('profile');
//getting users
     getUsers();
        function getUsers(){
              var userData = {
                uid : profile.user_id,
                name : profile.name
              };
              console.log(userData);
        }
});
