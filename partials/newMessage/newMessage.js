angular.module('sample.newMessage', ['auth0'])

.controller('newMessageCtrl', function HomeController ($scope, $http, $filter, $location, auth){
  /*
  $scope.url = 'api/getUserForMessage.php'; // The url of our search

	// The function that will be executed on button click (ng-click="search()")
	$scope.search = function() {
var name = {name: $scope.name};
		// Create the http post request
		// the data holds the keywords
		// The request is a JSON request.
		$http.post($scope.url, name).
		success(function(data, status) {
			$scope.status = status;
			$scope.data = data;
			$scope.result = data; // Show result from server in our <pre></pre> element
		    console.log(data);
    })
		.
		error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;
		});
	};
*/
  $scope.method = 'GET';
  $scope.url = 'api/getUserForMessage.php';
  //execute method
  $http({method: $scope.method, url: $scope.url})

  .success(function(data, status){
        $scope.status = status;
        $scope.users = data;
       }).
       //state errer if couldn't make connection
       error(function(data, status) {
         $scope.posts = data || "Request failed";
         $scope.status = status;
     });

});
