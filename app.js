var app = angular.module( 'TravelMate', [
  'auth0',
  'ngRoute',
  'sample.allPosts',
  'sample.addPosts',
  'sample.profile',
  'sample.auth',
  'sample.login',
  'sample.newMessage',
  'angular-storage', 'ui.bootstrap',  'angular-jwt', 'ngDialog'
])
.config( function myAppConfig ( $routeProvider, authProvider, $httpProvider, $locationProvider,
  jwtInterceptorProvider) {
  $routeProvider
    .when( '/', {
      controller: 'postCtrl',
      templateUrl: 'partials/allPosts/allPosts.html',
      pageTitle: 'Home',
      requiresLogin: true
    })
    .when( '/addPosts', {
      controller: 'addPostCtrl',
      templateUrl: 'partials/addPosts/addPosts.html',
      pageTitle: 'AddPosts',
      requiresLogin: true
    })
    .when( '/profile',{
      controller: 'profileCtrl',
      templateUrl: 'partials/profile/profile.html',
      pageTitle: 'Profile',
      requiresLogin: true
    })
    .when( '/login', {
      controller: 'LoginCtrl',
      templateUrl: 'partials/login/login.html',
      pageTitle: 'Login'
    })
    .when( '/newMessage', {
      controller: 'newMessageCtrl',
      templateUrl: 'partials/newMessage/newMessage.html',
      pageTitle: 'New Message',
      requiresLogin: true
    });


  authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    loginUrl: '/login'
  });

  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');
  }
  $httpProvider.interceptors.push('jwtInterceptor');
}).run(function($rootScope, auth, store, jwtHelper, $location) {
//chech if user is loggend in webapp / on refresh page stay in logged in / if not gring to login page
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
          //if authenticated show navbar
          $rootScope.isAuthenticated = true;
        } else {
          $location.path('/login');
          //if not authenticated hide navbar
          $rootScope.isAuthenticated = false;
        }
      }
    }
  });
})
.controller( 'AppCtrl', function AppCtrl ( $scope, $location) {

  $scope.$on('$routeChangeSuccess', function(e, nextRoute){


    if ( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
      $scope.pageTitle = nextRoute.$$route.pageTitle + ' | TravelMate' ;
    }
  });
})

;
