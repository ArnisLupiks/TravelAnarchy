angular.module( 'sample', [
  'ui.router',
  'restangular',
  'sample.auth',
  'sample.todoList',
  'sample.todoItem',
  'sample.login',
  'auth0'
])
.config( function ( RestangularProvider, $urlRouterProvider, authProvider, $httpProvider) {

  authProvider.init({
    domain: 'anarchy.auth0.com',
    clientID: '7X4K9ubayD4zqas8amBegd7kZzar683k',
    callbackURL: location.href,
    loginState: 'login'
  });

  RestangularProvider.setBaseUrl('http://localhost/auth0/api/');

  $httpProvider.interceptors.push('authInterceptor');

  $urlRouterProvider.otherwise('/');

  authProvider.on('loginSuccess', function($state) {
    $state.go('auth.todoList');
  })
})
.run(function(auth) {
  auth.hookEvents();
})
.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {

})

;
