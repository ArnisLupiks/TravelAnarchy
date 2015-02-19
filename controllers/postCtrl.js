app.controller('postCtrl', ['$scope','$http','$filter','$location','FileUploader','ngDialog', function($scope, $http, $filter, $location, Fileuploader, ngDialog){

	getPosts(); //Load all available tasks
		function getPosts(){
			$http.get("api/getPosts.php").success(function(data){
				$scope.posts = data;
			});
		}


	$scope.uploader = new FileUploader();
	//filter utility function
	$scope.customArrayFilter =function (item){
		return (item.postHeading.indexOf('it') != -1);
	};


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


	//location scope is empty
	$scope.location = '';
	//on submit button do post and collect data
	$scope.submitForm = function(){
		//check if location is set or not
		if($scope.location === ''){
			alert('Directive did not update the location property in post controller.');
		}else{

		}
	//adds results to post from ****************************
	var formData = {
		uid: $('input[name=uid]').val(),
		heading: $('input[name=heading]').val(),
		content: $('textarea[name=content]').val(),
		location: $scope.location,
		date: $scope.dt
	};
	$http({
		url: "api/addPost.php",
		data: formData,
		method: 'POST',
		headers :{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
	}).success(function(data){
		//if added information, it will log OK and redirect.
		console.log("OK", data);
		//redirect to main page
		$location.path("/");
	}).error(function(err)("ERR", console.log(err)})
	};
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
		var newScope = £scope.$new();
		newScope.post = post;
		ngDialog.open({ template: 'posts/individualPosts.html', className: 'ngdialog-theme-default', controller: 'postCtrl', scope: newScope});
		var lat = post.latitude;
		var long = post.longitude;
		var mid = post.postID;
		$scope.map = {center: latitude: lat, longitude: long}, zoom:15};

	$scope.markers = {key: mid, coords:{latitude: lat, longitude:long},icon:'bower_components/angular-maps/example/assets/images.blue_marker.png',
		optimized:false,labelClass:"label"};
	};

	$scope.isSelected = function(section){
		return $scope.selected === section;
	}
	app.constant('angularMomentConfig',{
		preprocess: 'unix', //optional
		timezone: 'Europe/London' //optional
	});

	//add pictures
	var uploader = $scope.uploader = new FileUploader({
		url: ''
	});

	
	}]);
