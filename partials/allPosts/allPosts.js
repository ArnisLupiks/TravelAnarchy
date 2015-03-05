angular.module('sample.allPosts', [
  'ui.router',
  'restangular'



])
.config(function($stateProvider) {
  $stateProvider
    .state('auth.allPosts', {
      url: '/',
      controller: 'postCtrl',
      templateUrl: 'partials/allPosts/allPosts.html'
    
    });
})

.controller('postCtrl', function($scope, $http, $filter, $location, Restangular, auth){

	$scope.auth = auth;
        // google map scope
        $scope.map = { center :{latitude:45,longitude:-73},zoom:8};


        getPosts(); //Load all available tasks
                function getPosts(){
                        $http.get("api/getPosts.php").success(function(data){
                                $scope.posts = data;
                        });
                }

        //optional -- order by date
        var orderBy = $filter('orderBy');
        $scope.order = function(predicate, reverse){
                $scope.posts = orderBy($scope.posts, predicate, reverse);
        };

        $scope.order ('-postDate',false);

        // date pick option
        $scope.today = function(){
                $scope.dt = new Date();
                console.log("today button pressed");
        };

        $scope.open = function($event){
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
        };

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
        }
        app.constant('angularMomentConfig',{
                preprocess: 'unix', //optional
                timezone: 'Europe/London' //optional
        });



});
