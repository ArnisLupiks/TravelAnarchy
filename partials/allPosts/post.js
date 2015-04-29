angular.module('sample.post', ['auth0'])
//controller
.controller('onePostCtrl', function (Flash, $scope, $http, $filter, $location, auth, ngDialog){

  $scope.openPost = function(post) {

    console.log(post.postID);
  };
});
