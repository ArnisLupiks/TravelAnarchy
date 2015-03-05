var app = angular.module( 'sample', [
  'ui.router',
  'restangular',
  'sample.auth',
  'sample.allPosts',
  'sample.addPosts',
  'sample.login',
  'uiGmapgoogle-maps',
  'auth0',
  'angular-storage'
])
.config( function ( RestangularProvider, $urlRouterProvider, authProvider, $httpProvider) {

  authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    callbackURL: location.href,
    loginState: 'login'
  });

  RestangularProvider.setBaseUrl('http://localhost/TravelAnarchy/');

  $httpProvider.interceptors.push('authInterceptor');

  $urlRouterProvider.otherwise('/');

  authProvider.on('loginSuccess', function($state) {
    $state.go('auth.allPosts');
  })
})
.run(function(auth) {
  auth.hookEvents();
})
.controller( 'AppCtrl', function AppCtrl ( $scope, $location, auth, $state ) {
  $scope.auth = auth;

  $scope.logout = function(){
    auth.singout();
    $state.go('auth.login');
  }
})

;
