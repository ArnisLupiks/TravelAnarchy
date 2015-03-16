angular.module('sample.allPosts', ['auth0'])
//controller
.controller('postCtrl', function HomeController ($scope, $http, $filter, $location, auth){
        //set get method for posts
        $scope.method = 'GET';
        $scope.url = 'api/getPosts.php';
        //execute method
        $http({method: $scope.method, url: $scope.url}).
          success(function(data, status) {
            $scope.status = status;
            $scope.posts = data;
            //console.log($scope.posts);
            //add to each post user profile information
            angular.forEach($scope.posts ,function(post){
              //get user id
              var picUsrId = {uid : post.uid };
              //get user information
              $http.post("api/getPostUPic.php" , picUsrId)
                .success(function(picdata){
                      //adds picture/name/surname to post object
                      post.picture = picdata[0];
                    //trow error if not successfully executed function
                    }).error(function(err){
                        "ERROR in getPostUPic", console.log(err)
                    });
            })
          }).
          //state errer if couldn't make connection
          error(function(data, status) {
            $scope.posts = data || "Request failed";
            $scope.status = status;
        });

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
        $scope.reset = function(){
                $scope.form = angular.copy($scope.master);
                $scope.dt = angular.copy($scope.master);
                console.log("reset has been pressed");
        };
  // popup dialog for post page ***************************
        $scope.openPopup = function(post){
                var newScope = $scope.$new();
                newScope.post = post;
                ngDialog.open({ template: 'posts/individualPosts.html', className: 'ngdialog-theme-default', controller: 'postCtrl', scope: newScope});
                var lat = post.latitude;
                var long = post.longitude;
                var mid = post.postID;
                $scope.map = {center:{ latitude: lat, longitude: long}, zoom:15};

        $scope.markers = { key: mid, coords: {latitude :lat, longitude: long },icon: 'bower_components/angular-maps/example/assets/images.blue_marker.png',
                optimized:false,labelClass:"label"};
        };
        $scope.isSelected = function(section){
                return $scope.selected === section;
        };


});
