var app = angular.module( 'TravelMate', [
  'auth0','ngRoute','sample.allPosts','sample.addPosts','sample.profile',
  'sample.auth','sample.login','sample.newMessage','sample.messages', 'sample.friends','angularMoment','ngDialog',
  'sample.favorLogs','flash','uiGmapgoogle-maps', 'angular-storage', 'ui.bootstrap',  'angular-jwt',  'angularFileUpload'
])
.config( function myAppConfig ( $routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {
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
    .when( '/log/:postID',{
      controller: 'postDetailCtrl',
      templateUrl: 'partials/allPosts/post.html',
      pageTitle: 'Post',
      requiresLogin: true
    })
    .when( '/friends' ,{
      controller: 'friendsCtrl',
      templateUrl: 'partials/friends/friends.html',
      pageTitle: 'Friends',
      requireLogin: true
    })
    .when( '/friendProfile' ,{
      controller: 'friendsCtrl',
      templateUrl: 'partials/friends/friendProfile.html',
      pageTitle: 'Friend Profile',
      requireLogin: true
    })
    .when( '/favoritlogs' ,{
      controller: 'favoriteCtrl',
      templateUrl: 'partials/favoriteLogs/favorLogs.html',
      pageTitle: 'FavoriteLogs',
      requiresLogin:true
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
    })
    .when( '/about', {
      templateUrl: 'partials/about/about.html',
      pageTitle: 'About' ,
      requiresLogin: true
    })
    .when( '/message', {
      controller: 'messageCtrl',
      templateUrl: 'partials/messages/messages.html',
      pageTitle: 'Messages',
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
          $location.path('/');
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
});
app.factory('otherUsrPic',function($http){
  return{
    getOtherProfile : function(picUsrId){
      return $http({
        url: 'api/getPostUPic.php',
        method: 'POST',
        data: picUsrId
      })
    }
}
});
