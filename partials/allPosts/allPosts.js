angular.module('sample.allPosts', ['auth0'])
//factory to get/list logs
.factory('posts',function($http){
  return{
    list: function(callback){
      $http.get('api/getPosts.php').success(callback)
    },
    find: function(postID, callback){
      $http.get('api/getPosts.php').success(function(data){
        var post = data.filter(function(entry){
          return entry.postID === postID;
        })[0];
        callback(post);
      });
    },
    deleteLog : function(remLog){
      return $http({ url: 'api/removeLog.php', method: 'POST', data: remLog})
    }
  };
})

//factory to get/remove/add all comments from database
.factory('addCom' ,function($http){
  return{
    addComments : function(commentData){
      return $http({ url: 'api/addComments.php', method: 'POST', data: commentData })
    },
    allComments : function(postID){
      return $http({ url: 'api/getComments.php', method: 'POST', data: postID})
    },
    removeComment : function(comID){
      return $http({url: 'api/removeComment.php', method: 'REMOVE', data: comID})
    }
  }
})
.factory('favLog', function($http){
  return{
    addFavorit: function(favoritData){
      return $http({ url: 'api/addToFavorit.php', method: 'POST', data: favoritData })
    }
  }
})


.directive('slider', function() {
  var linker = function(scope, element, attr) {
    var selector = attr.sliderClassSelector;
    var watchSelector = attr.sliderRefreshOnWatch;

    scope.$watch(watchSelector, function() {
        $('.'+selector).responsiveSlides({
          auto: true,     // Boolean: Animate automatically, true or false
          pager: false,// Boolean: Show pager, true or false
          speed: 500, // Integer: Speed of the transition, in milliseconds
          timeout: 4000, // Integer: Time between slide transitions, in milliseconds
          maxwidth: 1060,
         nav: false,             // Boolean: Show navigation, true or false
         random: false,          // Boolean: Randomize the order of the slides, true or false
         pause: false,           // Boolean: Pause on hover, true or false
         pauseControls: true,    // Boolean: Pause when hovering controls, true or false
         prevText: "Previous",   // String: Text for the "previous" button
         nextText: "Next",       // String: Text for the "next" button
         maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
         navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
         manualControls: ""     // Selector: Declare custom pager navigation
        });
      });

  };
  return {
    restrict: "A",
    link: linker
  }
})
.controller('thisController', function($scope){
  $scope.$on('LOAD' , function(){$scope.loading =true});
  $scope.$on('UNLOAD' , function(){$scope.loading =false});
})
//displays all logs in grid view on main page
.controller('postCtrl', function (Flash,pics,like, $interval,posts,otherUsrPic,favLog, $scope, $http, $filter, $location, auth){
      //lists all logs
      /*  $scope.refresfLogs = function(){ */
      $scope.$emit('LOAD')

      posts.list(function(posts){
          $scope.posts = posts;
            angular.forEach($scope.posts ,function(post){
              var picUsrId = {uid : post.uid };
              var picUID = {uniqueID: post.pict};

              pics.getPic(picUID).success(function(data){
                post.pics = data;
                $scope.$emit('UNLOAD')

              });


              otherUsrPic.getOtherProfile(picUsrId).success(function(picdata){
                post.picture = picdata[0];
              });
            });
      });
      /*  };
      //set interval for reloding logs
        $interval(function(){
          $scope.refresfLogs();
         }.bind(this), 10000);
         $scope.refresfLogs();

*/
      $scope.addLike = function(post){
        var favorData = {uid: auth.profile.user_id, postID: post.postID};
        like.addLiky(favorData).success(function(data){
          console.log("this is data from liky: ",data);
        })
      }
      //optional -- order by date
        var orderBy = $filter('orderBy');
        $scope.order = function(predicate, reverse){
                $scope.posts = orderBy($scope.posts, predicate, reverse);
        };
        $scope.order ('-postDate',false);

        $scope.dateOption = {
                formatYear: 'yy',
                startingDay:1
        };
        $scope.formats = ['yyyy/MM/dd','ss-MMMM-yyyy','dd.MM.yyyy','shortDate'];
        $scope.format = $scope.formats[0];
        //reset form ********************************************
        $scope.master = {};
        $scope.maste = "";
        //reset all fields to empty
        $scope.reset = function(){
                $scope.form = angular.copy($scope.master);
                $scope.dt = angular.copy($scope.master);
                console.log("reset has been pressed");
        };
        $scope.isSelected = function(section){
                return $scope.selected === section;
        };

  // add Heart to post
    $scope.count = function(post){
      console.log(post.postID);
      $scope.like = post.likes + 1;
    };

    //add favorite posts to users collection
    $scope.addToFavorit = function(post){
      var favoritData = {uid:auth.profile.user_id, postID:post.postID};
      favLog.addFavorit(favoritData).success(function(data){
        var message = "<strong> "+auth.profile.name+"</strong> you have added to favorites <em>" + post.picture.username + " " + post.picture.surname + "</em> log";
        Flash.create('success', message, 'customAlert');
        console.log(data);
      });

    };
})

// displays selected log from the list above
.controller('postDetailCtrl', function HomeController (Flash, posts,pics, $interval,otherUsrPic, addCom, $rootScope,  uiGmapGoogleMapApi, $routeParams, $scope, $http, $filter, $location, auth){

        $scope.auth = auth;
        // ************* Displaying individual log details ************************
        posts.find($routeParams.postID, function(post){
          $rootScope.post = post;
          $scope.post = post;
          var postID = {postID: post.postID};
              var picUID = {uniqueID: post.pict};
              pics.getPic(picUID).success(function(data){
                post.pica = data;
                console.log("this is picture dateeeeeeeeeeeeeeee: ",  post.pica);

              });
          $scope.addData = function(){//show and refresh list of comments
            addCom.allComments(postID).success(function(data){
              $scope.allcoms = data;
              angular.forEach($scope.allcoms ,function(allcom){
                $scope.allcom = [];
                var picUsrId = {uid : allcom.comUsrID };//setting variable wiwth member friend id
                otherUsrPic.getOtherProfile(picUsrId).success(function(picdata){
                    allcom.picture = picdata[0];
                })
              });
            });
          };
          //set interval for reloding comments
            $interval(function(){
              $scope.addData();
             }.bind(this), 10000);
          $scope.addData();
          // end of get comments
            //marker for map
                uiGmapGoogleMapApi.then(function(maps) {
                  $scope.map = {center: { latitude: post.latitude, longitude: post.longitude }, zoom: 17 };

                  $scope.marker = {
                        id: 0,
                        coords: {latitude : post.latitude, longitude: post.longitude },
                        options: { draggable: true },
                        events: {
                          dragend: function (marker, eventName, args) {
                            console.log('marker dragend');
                            var lat = marker.getPosition().lat();
                            var lon = marker.getPosition().lng();
                            console.log(lat);
                            console.log(lon);

                            $scope.marker.options = {
                              draggable: true,
                              labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                              labelAnchor: "100 0",
                              labelClass: "marker-labels"
                            };
                          }
                        }
                      };
                  });
          var picUsrId = {uid : post.uid };
          // ******* get user information ********
            otherUsrPic.getOtherProfile(picUsrId).success(function(picdata){
              post.picture = picdata[0];
            })
          });
        // *************** Add comment function **********************************
        $scope.addComment = function(){
          var commentData = {postID: $rootScope.post.postID, uid: $rootScope.post.uid, comUsrID: auth.profile.user_id, comContent: $scope.comment};
          addCom.addComments(commentData).success(function(data){
            $scope.addData();
          });
        };
        // *************** Remove comment function *******************************
        $scope.deleteCom = function(allcom){
          var comID = {comID: allcom.id, comUsrID: auth.profile.user_id};
          addCom.removeComment(comID).success(function(data){
            $scope.addData();
          });
        };
        // ************** Remove Log form user ***********************************
        $scope.removePost = function(post){
          var remLog = {postID: post.postID, uid: auth.profile.user_id};
          posts.deleteLog(remLog).success(function(data){
            $location.path("/");
          });
        };


// return to previous page
  $scope.back = function() {
    window.history.back();
  };
});
