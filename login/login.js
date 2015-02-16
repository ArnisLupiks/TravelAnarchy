angular.module('sample.login', [
  'ui.router',
  'auth0'
])
.config(function($stateProvider, authProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'login/login.html'
    });

    authProvider.on('loginSuccess', function($state){
      $state.go('auth.todoList');
    });

    authProvider.on('loginFailure', function(error){
      console.log('there was an error', error);
    });
})
.controller('LoginCtrl', function($scope, auth, $state) {
  auth.signin({
    standalone: true,
    chrome: true
  });

});
