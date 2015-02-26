var app = angular.module( 'sample', [
  'ui.router',
  'restangular',
  'sample.auth',
  'sample.allPosts',
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

  RestangularProvider.setBaseUrl('http://localhost/TravelAnarchy/auth0/');

  $httpProvider.interceptors.push('authInterceptor');

  $urlRouterProvider.otherwise('/');

  authProvider.on('loginSuccess', function($state) {
    $state.go('auth.allPosts');
  })
})
.run(function(auth) {
  auth.hookEvents();
})
.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {

})

;
