angular.module('sample.favorLogs',['auth0'])
//controller
.factory('favorit', function($http){
  return{
    getFavorites : function(Usr){
      return $http({url : 'api/getFavorites.php', method: 'POST', data: Usr})
    },
    getFavoriteLogs : function(postID){
      return $http({url : 'api/getFavoriteLogs.php', method: 'POST', data: postID})
    },
    removeFavorit : function(rmFavor){
      return $http({url: 'api/removeFavorite.php', method: 'POST', data: rmFavor})
    }
  }
})
.controller('favoriteCtrl', function ($scope, Flash, favorit, otherUsrPic, $http, $filter, $route, $location, auth, ngDialog){
  //set get method for posts
  var Usr ={uid:auth.profile.user_id};
  $scope.addData = function(){
    favorit.getFavorites(Usr).success(function(data){
        $scope.favorites = data;
        //for each favorite log id get all log details
          angular.forEach($scope.favorites, function(favorite){
            var postID = {postID:favorite.postID};
            favorit.getFavoriteLogs(postID).success(function(data){
                  favorite.logs = data[0];
                  $scope.logs = data;
                    angular.forEach($scope.logs, function(log){
                      var picUsrId = {uid: log.uid};
                      otherUsrPic.getOtherProfile(picUsrId).success(function(picdata){
                            log.picture = picdata[0];
                      });
                    })
              });
          })
    });
  };
  $scope.addData();
  // remove log from favoites
  $scope.removeFavorit = function(favorite){
    var rmFavor = {uid: auth.profile.user_id, postID:favorite.postID};
    favorit.removeFavorit(rmFavor).success(function(data){
        var message = "<strong> "+auth.profile.name+"</strong> you have deleted from favorites <em>" + favorite.logs.picture.username + " " + favorite.logs.picture.surname + "</em> log";
        Flash.create('danger', message, 'customAlert');
        $scope.addData();
      });
  };
});
