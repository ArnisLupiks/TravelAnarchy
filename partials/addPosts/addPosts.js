angular.module('sample.addPosts', [
  'ui.router',
  'restangular',
])
.config(function($stateProvider) {
  $stateProvider
    .state('auth.addPosts', {
      url: '/addPosts',
      controller: 'addPostCtrl',
      templateUrl: 'partials/addPosts/addPosts.html',
    });
})
.controller('addPostCtrl',
            function($scope, $http, $filter, $location, auth){
              //shows user credentials
              $scope.auth = auth;
              // date pick option
              $scope.today = function() {
                $scope.dt = new Date();
                console.log("today button pressed");
              };
              $scope.open = function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              $scope.opened = true;
              };
              $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
              };
              $scope.formats = ['yyyy/MM/dd','dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
              $scope.format = $scope.formats[0];
              //location scope is empty
              //$scope.location = '';
              // on submit button do post and collect data
               $scope.submitForm = function() {
                      // check if location is set or not
                    /**  if($scope.location === ''){
                         alert('Directive did not update the location property in parent controller.');
                      } else {
                         //alert('Yay. Location: ' + $scope.location);
                      }*/
                      var formData = {
                      uid: $('input[name=uid]').val(),
                      heading: $('input[name=heading]').val(),
                      content: $('textarea[name=content]').val(),
                      //location: $scope.location,
                      date: $scope.dt
                    };
                    console.log(formData);
                    $http({
                        url: "api/addPosts.php",
                        data: formData,
                        method: 'POST',
                        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
                    }).success(function(data){
                        //if added information, it will log OK and redirect.
                        console.log("OK", data);
                        //redirect to main post page
                        $location.path("/");
                    }).error(function(err){"ERR", console.log(err)})
                };
                //reset form
                 $scope.master = {};
                 $scope.maste = "";
                 $scope.reset = function() {
                     $scope.form = angular.copy($scope.master);
                     $scope.dt = angular.copy($scope.master);
                     console.log("reset has been pressed");
                };
        });
